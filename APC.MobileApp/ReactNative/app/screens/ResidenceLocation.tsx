import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, GestureResponderEvent, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { APCApi, Configuration } from '../api/generated';
import Colors from '../themes/Colors';
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar';
import palette from '../themes/Colors';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useEffect, useState } from 'react';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { LocationObject, LocationObjectCoords } from 'expo-location';
import * as APCService from '../utils/APCService'
import * as BingService from '../utils/BingService'
import { useApiClient } from '../api/ApiClientProvider';
import { Picker } from '@react-native-picker/picker';
import cities from '../utils/cities.json'

interface StepProps {
  setProgress: (progress: number) => void;
}

const ResidenceLocation: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  const apiClient = useApiClient();
  const [hackedGPS, setHackedGPS] = useState<LocationObjectCoords>();
  const [gpsCoords, setGPSCoords] = useState<LocationObjectCoords>();
  const [apcCoords, setAPCCoords] = useState<LocationObjectCoords>();
  const [gpsLocation, setGPSLocation] = useState<BingService.Location | null>();
  const [apcLocation, setAPCLocation] = useState<BingService.Location | null>();

  const { control, handleSubmit, formState: { errors }, getValues, watch, setValue } = useForm({
    defaultValues: {
      Country: '',
      City: '',
      StateProvince: '',
      UseAPC: true,
      GPSOption: 'true'
    }
  });

  const handleCountryChange = (country: string) => {
    setValue('Country', country);
    const firstStateOption = cities.filter(item => item.country === country).map(item => item.state)[0] || '';
    setValue('StateProvince', firstStateOption);
    handleStateChange(firstStateOption)
  };
  const handleStateChange = (state: string) => {
    setValue('StateProvince', state);
    const firstCityOption = cities.filter(item => item.country == getValues('Country') && item.state === state).map(item => item.city)[0] || '';
    setValue('City', firstCityOption);
    handleCityChange(firstCityOption);
  };
  const handleCityChange = (city: string) => {
    setValue('City', city);

    const selectedCity = cities.filter(d => d.country == getValues('Country') && d.state == getValues('StateProvince') && d.city == city)[0];

    setHackedGPS(APCService.getLocationCoords(selectedCity.latitude, selectedCity.longitude));
  }

  const onFormValid = async (data: FieldValues) => {
    console.log('Submitted Data:', data);
    navigation.navigate('StarterPage');
    const selectedCity = cities.filter(d => d.country == data.Country && d.state == data.StateProvince && d.city == data.City)[0];

    let coordsForm = await APCService.getLocationCoords(selectedCity.latitude, selectedCity.longitude);

    let coords: LocationObjectCoords;
    if (data.GPSOption == 'true')
      coords = (await APCService.getDeviceGPSLocation());
    else
      coords = coordsForm;

    // APC validation
    if (data.UseAPC) {
      const response = await APCService.matchesAPCLocation(apiClient, coords);

      if (!response.verificationResult)
        console.error('APC validation failed!!');
    }

    // Business validation
    if (!await APCService.matchesCoords(coords, coordsForm)) {
      console.error('Business validation failed!!');
    }


  }
  useEffect(() => {
    setProgress(25);
    APCService.getDeviceGPSLocation().then((coords) => {
      setGPSCoords(coords);
      return BingService.translateCoordsToLocation(coords)
    })
      .then(setGPSLocation);

    APCService.getAPCLocation(apiClient).then((coords) => {

      setAPCCoords(coords);
      return BingService.translateCoordsToLocation(coords)
    })
      .then(setAPCLocation);

    const firstCountry = cities
      .map(item => item.country)
      .filter((value, index, self) => self.indexOf(value) === index)[0];
    handleCountryChange(firstCountry);
  }, [setProgress]);

  return (
    <AppContainer>
      <ScrollView style={styles.container}>
        <View>
          <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: 'bold', alignSelf: 'center' }}>Residence Location</Text>
          <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: 'normal', alignSelf: 'center', width: '100%', textAlign: 'center' }}>Please, select your country and state/province of residence</Text>
          <Controller
            name='Country'
            control={control}
            // rules={{
            //   required: 'This field is required',
            //   pattern: {
            //     value: /^[a-zA-Z ]*$/,
            //     message: 'No numbers allowed',
            //   },
            //   validate: {
            //     startsWithCapital: (value: string) => {
            //       const otherValue = getValues('StateProvince'); // we can check other field values
            //       return value.charAt(0) === value.charAt(0).toUpperCase() || 'City must start with a capital letter';
            //     }
            //   },
            // }}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={handleCountryChange}
              >
                {cities
                  .map(item => item.country)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                  .map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                  ))}
              </Picker>
            )}
          />
          {errors.Country && <StyledText customStyle={['regular']} color='danger200'>{errors.Country.message}</StyledText>}

          <Controller
            name='StateProvince'
            control={control}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={handleStateChange}
                enabled={!!getValues('Country')}
              >
                {cities
                  .filter(item => item.country === getValues('Country'))
                  .map(item => item.state)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                  .map((state, index) => (
                    <Picker.Item key={index} label={state} value={state} />
                  ))}
              </Picker>
            )}
          />
          {errors.StateProvince && <StyledText color='danger200'>{errors.StateProvince.message}</StyledText>}


          <Controller
            name='City'
            control={control}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={handleCityChange}
                enabled={!!getValues('StateProvince')}
              >
                {cities
                  .filter(item => item.country == getValues('Country') && item.state === getValues('StateProvince'))
                  .map(item => item.city)
                  .filter((value, index, self) => self.indexOf(value) === index)                  
                  .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                  .map((city, index) => (
                    <Picker.Item key={index} label={city} value={city} />
                  ))}
              </Picker>
            )}
          />
          {errors.City && <StyledText color='danger200'>{errors.City.message}</StyledText>}

          <View style={styles.btnContainer}>
            <StyledText style={styles.comparisonTitle} textStyle='title6'>Internal Comparison with:</StyledText>
            <Controller
              control={control}
              name='GPSOption'
              rules={{ required: 'Please select an option' }}
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View >
                    <View>
                      <View style={styles.flex}>
                        <RadioButton value='true' color={Colors.accent200} />
                        <StyledText>True GPS</StyledText>
                      </View>
                      <View style={styles.optionSubtitleContainer}>
                        <View style={styles.optionSubtitleBadge}>
                          <StyledText>{gpsLocation?.country} - {gpsLocation?.state} - {gpsLocation?.city}</StyledText>
                        </View>
                        <View style={styles.optionSubtitleBadge}>
                          <StyledText>{gpsCoords?.latitude}, {gpsCoords?.longitude}</StyledText>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.flex}>
                      <RadioButton value='hacked' color={Colors.accent200} />
                      <StyledText>Hacked GPS</StyledText>
                    </View>
                    {
                      getValues('Country') && getValues('StateProvince') && getValues('City') ? (
                        <View style={styles.optionSubtitleContainer}>
                          <View style={[styles.optionSubtitleBadge]}>
                            <StyledText>{getValues('Country')} - {getValues('StateProvince')} - {getValues('City')}</StyledText>
                          </View>
                          <View style={styles.optionSubtitleBadge}>
                            <StyledText>{hackedGPS?.latitude}, {hackedGPS?.longitude}</StyledText>
                          </View>
                        </View>
                      ) : null
                    }
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <View style={styles.flex}>
                      <Controller
                        control={control}
                        name='UseAPC'
                        render={({ field: { onChange, value } }) => (
                          <CheckboxWithText
                            label='Use Azure Programmable Connectivity Backend'
                            checked={value}
                            onToggle={() => onChange(!value)}
                          />
                        )}
                      />
                    </View>

                    <View style={styles.optionSubtitleContainer}>
                      <View style={styles.optionSubtitleBadge}>
                        <StyledText>{apcLocation?.country} - {apcLocation?.state} - {apcLocation?.city}</StyledText>
                      </View>
                      <View style={styles.optionSubtitleBadge}>
                        <StyledText>{apcCoords?.latitude}, {apcCoords?.longitude}</StyledText>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              )}
            />
          </View>
          <Button
            title='Submit'
            style={styles.button}
            useGradient={true}
            onPress={handleSubmit(onFormValid)}
          />

        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    // justifyContent: 'flex-start',
    gap: 5,
    padding: 15
  },
  imageContainer: {
    width: '100%',
    height: 90
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginTop: 30,
    alignSelf: 'flex-end',
    width: '100%'
  },
  separatorContainer: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary100
  },
  btnContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: palette.secondary200,
    backgroundColor: palette.secondary100,
    padding: 15,
    marginHorizontal: 10,

  },
  comparisonTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  option: {
    flexDirection: 'row',
    marginVertical: 10
  },
  optionSubtitleContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  optionSubtitleBadge: {
    backgroundColor: Colors.secondary200,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 10
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ResidenceLocation;
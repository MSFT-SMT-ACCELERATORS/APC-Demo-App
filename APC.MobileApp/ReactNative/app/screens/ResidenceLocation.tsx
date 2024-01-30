import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../themes/Colors';
import Button from '../components/Button'
import palette from '../themes/Colors';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useEffect, useState } from 'react';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { LocationObjectCoords } from 'expo-location';
import * as APCService from '../utils/APCService'
import { useApiClient } from '../api/ApiClientProvider';
import * as BingService from '../utils/BingService'
import { Picker } from '@react-native-picker/picker';
import cities from '../utils/cities.json'
import customStyles from '../themes/CustomStyles';
import RNPickerSelect from 'react-native-picker-select';


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
    if (!country)
      return;

    setValue('Country', country);
    const firstStateOption = cities.filter(item => item.country === country).map(item => item.state)[0] || '';
    setValue('StateProvince', firstStateOption);
    handleStateChange(firstStateOption)
  };
  const handleStateChange = (state: string) => {
    if (!state)
      return;

    setValue('StateProvince', state);
    const firstCityOption = cities.filter(item => item.country == getValues('Country') && item.state === state).map(item => item.city)[0] || '';
    setValue('City', firstCityOption);
    handleCityChange(firstCityOption);
  };
  const handleCityChange = (city: string) => {
    if (!city)
      return;

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
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>

          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>Residence Location</StyledText>
            <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please, select your country and state/province of residence.</StyledText>
          </View>

          <View style={[styles.separatorContainer, customStyles.mb4]}></View>
          <View style={styles.bodyContent}>
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
                <RNPickerSelect
                  value={field.value}
                  onValueChange={handleCountryChange}
                  items={cities
                    .map(item => item.country)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                    .map((item) => {
                      return {
                        label: item,
                        value: item
                      }
                    })
                  }
                />
              )}
            />
            {errors.Country && <StyledText customStyle={['regular']} color='danger200'>{errors.Country.message}</StyledText>}
            
            <Controller
              name='StateProvince'
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  value={field.value}
                  disabled={!getValues('Country')}
                  onValueChange={handleStateChange}
                  items={cities
                    .filter(item => item.country === getValues('Country'))
                    .map(item => item.state)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                    .map((item) => {
                      return {
                        label: item,
                        value: item
                      }
                    })
                  }
                />
              )}
            />
            {errors.StateProvince && <StyledText color='danger200'>{errors.StateProvince.message}</StyledText>}
            <Controller
              name='City'
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  value={field.value}
                  disabled={!getValues('StateProvince')}
                  onValueChange={handleCityChange}
                  items={cities
                    .filter(item => item.country == getValues('Country') && item.state === getValues('StateProvince'))
                    .map(item => item.city)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
                    .map((item) => {
                      return {
                        label: item,
                        value: item
                      }
                    })
                  }
                />
              )}
            />
            {errors.City && <StyledText color='danger200'>{errors.City.message}</StyledText>}

            <View style={styles.btnGroup}>
              <StyledText style={styles.comparisonTitle}>Internal Comparison with:</StyledText>
              <Controller
                control={control}
                name='GPSOption'
                rules={{ required: 'Please select an option' }}
                render={({ field: { onChange, value } }) => (
                  <RadioButton.Group onValueChange={onChange} value={value}>
                    <View>
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
          </View>
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            title="Next"
            style={[styles.button]}
            size='long'
            useGradient={true}
            onPress={handleSubmit(onFormValid)} />
        </View>
      </View>
    </AppContainer>

  );
};

const styles = StyleSheet.create({
  parent: {
    width: ' 100%',
    flex: 1,
    backgroundColor: palette.primary300
  },
  title: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    gap: 10
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingTop: 0,
    marginBottom: 120
    // marginBottom:'33%'
  },
  bodyContent: {
    width: '100%',
    justifyContent: 'center',
    gap: 25,
  },
  idContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: palette.primary100,
    backgroundColor: palette.primary200,
    padding: 30,
    marginHorizontal: 10,
    marginBottom: 10
  },
  footer: {
    width: '100%',
    height: undefined
  },
  button: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  separatorContainer: {
    width: 300,
    alignSelf: 'center',
    borderBottomWidth: 3,
    borderBlockColor: palette.primary100
  },
  btnGroup: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: palette.secondary200,
    backgroundColor: palette.secondary100,
    padding: 30,
    marginHorizontal: 10,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallIconButton: {
    flex: .5
  },
  largeIconButton: {
    flex: 1
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
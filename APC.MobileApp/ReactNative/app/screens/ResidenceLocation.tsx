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
import textStyles from '../themes/Texts';
import { useApiClient } from '../api/ApiClientProvider';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface StepProps {
  setProgress: (progress: number) => void;
}

const ResidenceLocation: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  const apiClient = useApiClient();
  const [value, setValue] = useState('hacked');
  const [useAPC, setUseAPC] = useState(true);
    
  const { control, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      Country: '',
      City: '',
      StateProvince: ''
    }});

  const onFormValid = (data: FieldValues) => {
    console.log('Submitted Data:', data);

    // navigation.navigate('StarterPage');
  }

  useEffect(() => {
    setProgress(25);
  }, [setProgress]);

  return (
    <AppContainer>
      <ScrollView style={styles.container}>
        <View>
          <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Residence Location</Text>
          <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: "normal", alignSelf: "center", width: '100%', textAlign: 'center' }}>Please, select your country and state/province of residence</Text>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "No numbers allowed",
              },
            }}
            render={({ field }) => (
              <StyledInputText labelText="Country" placeholder="" {...field}></StyledInputText>
            )}
            name="Country"
          />
          {errors.Country && <StyledText textStyle="regular" color="danger200">{errors.Country.message}</StyledText>}

          <Controller
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "No numbers allowed",
              },
            }}
            render={({ field }) => (
              <StyledInputText labelText="State/Province" placeholder="" {...field}></StyledInputText>
            )}
            name="StateProvince"
          />
          {errors.StateProvince && <StyledText textStyle="regular" color="danger200">{errors.StateProvince.message}</StyledText>}


          <Controller
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "No numbers allowed",
              },
            }}
            render={({ field }) => (
              <StyledInputText labelText="City" placeholder="" {...field}></StyledInputText>
            )}
            name="City"
          />
          {errors.City && <StyledText textStyle="regular" color="danger200">{errors.City.message}</StyledText>}

          <View style={styles.btnContainer}>
            <StyledText style={styles.comparisonTitle} textStyle="title6">Internal Comparison with:</StyledText>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View >
                <View>
                  <View style={styles.flex}>
                    <RadioButton value="true" color={Colors.accent200} />
                    <StyledText textStyle="title6">True GPS</StyledText>
                  </View>
                  <View style={styles.optionSubtitleContainer}>
                    <View style={styles.optionSubtitleBadge}>
                      <StyledText>UUS - Ohio - Massillon</StyledText>
                    </View>
                    <View style={styles.optionSubtitleBadge}>
                      <StyledText>40.79434, -81.52214</StyledText>
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.flex}>
                  <RadioButton value="hacked" color={Colors.accent200} />
                  <StyledText textStyle="title6">Hacked GPS</StyledText>
                </View>
                <View style={styles.optionSubtitleContainer}>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText >US - NY - New York</StyledText>
                  </View>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText>40.61454, -73.82024</StyledText>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View style={styles.flex}>
                  <CheckboxWithText label='Use Azure Programmable Connectivity Backend' checked={useAPC} onToggle={() => setUseAPC(!useAPC)} />
                </View>

                <View style={styles.optionSubtitleContainer}>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText>US - Ohio - Massillon</StyledText>
                  </View>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText>40.79161, -81.52079</StyledText>
                  </View>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <Button
            title="Submit"
            style={styles.button}
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
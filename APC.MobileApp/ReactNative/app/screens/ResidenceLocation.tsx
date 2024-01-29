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
import { useApiClient } from '../api/ApiClientProvider';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import customStyles from '../themes/CustomStyles';

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
    }
  });

  const onFormValid = (data: FieldValues) => {
    console.log('Submitted Data:', data);

    navigation.navigate('StarterPage');
  }

  useEffect(() => {
    setProgress(25);
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
            <StyledInputText labelText="Country" placeholder="Country"></StyledInputText>
            <StyledInputText labelText="State/Province" placeholder="State/Province"></StyledInputText>
            <StyledInputText labelText="City" placeholder="City"></StyledInputText>

            <View style={styles.btnGroup}>
              <StyledText style={styles.comparisonTitle}>Internal Comparison with:</StyledText>
              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View >
                  <View>
                    <View style={styles.flex}>
                      <RadioButton value='true' color={Colors.accent200} />
                      <StyledText>True GPS</StyledText>
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
                    <RadioButton value='hacked' color={Colors.accent200} />
                    <StyledText>Hacked GPS</StyledText>
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
          </View>
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            title="Next"
            style={[styles.button]}
            size='long'
            useGradient={true}
            onPress={() => { setProgress(100); navigation.navigate('Information') }} />
        </View>
      </View>
    </AppContainer>


    // <AppContainer>
    //   <ScrollView style={styles.container}>
    //     <View>
    //       <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: 'bold', alignSelf: 'center' }}>Residence Location</Text>
    //       <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: 'normal', alignSelf: 'center', width: '100%', textAlign: 'center' }}>Please, select your country and state/province of residence</Text>
    //       <Controller
    //         control={control}
    //         rules={{
    //           required: 'This field is required',
    //           pattern: {
    //             value: /^[a-zA-Z ]*$/,
    //             message: 'No numbers allowed',
    //           },
    //         }}
    //         render={({ field }) => (
    //           <StyledInputText labelText='Country' placeholder='' {...field}></StyledInputText>
    //         )}
    //         name='Country'
    //       />
    //       {errors.Country && <StyledText customStyle={['regular']} color='danger200'>{errors.Country.message}</StyledText>}

    //       <Controller
    //         control={control}
    //         rules={{
    //           required: 'This field is required',
    //           pattern: {
    //             value: /^[a-zA-Z ]*$/,
    //             message: 'No numbers allowed',
    //           },
    //         }}
    //         render={({ field }) => (
    //           <StyledInputText labelText='State/Province' placeholder='' {...field}></StyledInputText>
    //         )}
    //         name='StateProvince'
    //       />
    //       {errors.StateProvince && <StyledText color='danger200'>{errors.StateProvince.message}</StyledText>}


    //       <Controller
    //         control={control}
    //         rules={{
    //           required: 'This field is required',
    //           pattern: {
    //             value: /^[a-zA-Z ]*$/,
    //             message: 'No numbers allowed',
    //           },
    //         }}
    //         render={({ field }) => (
    //           <StyledInputText labelText='City' placeholder='' {...field}></StyledInputText>
    //         )}
    //         name='City'
    //       />
    //       {errors.City && <StyledText color='danger200'>{errors.City.message}</StyledText>}

    //       <View style={styles.btnContainer}>
    //         <StyledText style={styles.comparisonTitle}>Internal Comparison with:</StyledText>
    //         <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
    //           <View >
    //             <View>
    //               <View style={styles.flex}>
    //                 <RadioButton value='true' color={Colors.accent200} />
    //                 <StyledText>True GPS</StyledText>
    //               </View>
    //               <View style={styles.optionSubtitleContainer}>
    //                 <View style={styles.optionSubtitleBadge}>
    //                   <StyledText>UUS - Ohio - Massillon</StyledText>
    //                 </View>
    //                 <View style={styles.optionSubtitleBadge}>
    //                   <StyledText>40.79434, -81.52214</StyledText>
    //                 </View>
    //               </View>
    //             </View>
    //           </View>

    //           <View>
    //             <View style={styles.flex}>
    //               <RadioButton value='hacked' color={Colors.accent200} />
    //               <StyledText>Hacked GPS</StyledText>
    //             </View>
    //             <View style={styles.optionSubtitleContainer}>
    //               <View style={styles.optionSubtitleBadge}>
    //                 <StyledText >US - NY - New York</StyledText>
    //               </View>
    //               <View style={styles.optionSubtitleBadge}>
    //                 <StyledText>40.61454, -73.82024</StyledText>
    //               </View>
    //             </View>
    //           </View>

    //           <View style={{ marginTop: 20 }}>
    //             <View style={styles.flex}>
    //               <CheckboxWithText label='Use Azure Programmable Connectivity Backend' checked={useAPC} onToggle={() => setUseAPC(!useAPC)} />
    //             </View>

    //             <View style={styles.optionSubtitleContainer}>
    //               <View style={styles.optionSubtitleBadge}>
    //                 <StyledText>US - Ohio - Massillon</StyledText>
    //               </View>
    //               <View style={styles.optionSubtitleBadge}>
    //                 <StyledText>40.79161, -81.52079</StyledText>
    //               </View>
    //             </View>
    //           </View>
    //         </RadioButton.Group>
    //       </View>
    //       <Button
    //         title='Submit'
    //         style={styles.button}
    //         useGradient={true}
    //         onPress={handleSubmit(onFormValid)}
    //       />

    //     </View>
    //   </ScrollView>
    // </AppContainer>
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
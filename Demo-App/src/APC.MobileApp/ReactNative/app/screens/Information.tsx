import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button'
import StyledInputText from '../components/StyledInputText';
import StyledText from '../components/StyledText';
import palette from '../themes/Colors';
import customStyles from '../themes/CustomStyles';
import AppContainer from '../components/AppContainer';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useStep } from '../utils/StepContext';
import { Logger } from '../utils/Logger';

interface StepProps {
  setProgress: (progress: number) => void;
  setLoading: (isLoading: boolean) => void;
}

const Information: React.FC<StepProps> = ({ setProgress, setLoading }) => {
  const navigation = useNavigation();
  const { setCurrentStep } = useStep();
  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
      setProgress(100);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const onFormValid = async (data: FieldValues) => {
    Logger.log(data);
    setProgress(100);
    navigation.navigate('Success');
  }

  return (
    <AppContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 165 : 165}
      >
        <View style={[styles.parent]}>
          <ScrollView style={[styles.contentContainer]}>

            <View style={[styles.title]}>
              <StyledText customStyle={['title2', 'extrabold']}>Personal information</StyledText>
              <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please complete the required information fields</StyledText>
            </View>

            <View style={[styles.separatorContainer, customStyles.mb4]}></View>
            <View style={styles.bodyContent}>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="First name" placeholder="First name" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Last name" placeholder="Last name" onChangeText={field.onChange}></StyledInputText>
                )} />


              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Street address" placeholder="Start typing your street... (e.g. 28 Mai...)" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='address2'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Unit/Apt number (optional)" placeholder="Address line 2" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="City" placeholder="City" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="State" placeholder="State" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='zipcode'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Zip code" placeholder="Zip code" onChangeText={field.onChange} inputType='numeric'></StyledInputText>
                )} />
              <View style={[styles.idContainer]}>
                <StyledText>Identity verification</StyledText>

                <Controller
                  name='birthdate'
                  control={control}
                  render={({ field }) => (
                    <StyledInputText labelText="Your date of birth" placeholder="MM/DD/YYYY" onChangeText={field.onChange}></StyledInputText>
                  )} />

                <Controller
                  name='ssn'
                  control={control}
                  render={({ field }) => (
                    <StyledInputText labelText="Your social security number (SSN)" placeholder="9 digit number" isSensitiveData={true} onChangeText={field.onChange}></StyledInputText>
                  )} />
              </View>
              <StyledText color='accent200'>By selecting the 'Confirm operation' option, you are agreeing to our terms and conditions, and will proceed with the account creation process.</StyledText>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Email" placeholder="Email" onChangeText={field.onChange}></StyledInputText>
                )} />

              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <StyledInputText labelText="Password" placeholder="Password" isSensitiveData={true} onChangeText={field.onChange}></StyledInputText>
                )} />
            </View>
          </ScrollView>
          <View style={[styles.footer]}>
            <Button
              title="Confirm request"
              style={[styles.button]}
              size='long'
              useGradient={true}
              onPress={handleSubmit(onFormValid)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

    </AppContainer >
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    width: '100%',
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
  },
  bodyContent: {
    width: ' 100%',
    justifyContent: 'center',
    gap: 25,
    marginBottom: 30
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
    marginTop: 100,
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
  }
});

export default Information;
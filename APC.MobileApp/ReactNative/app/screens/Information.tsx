import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import Colors from '../themes/Colors';
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar';
import StyledInputText from '../components/StyledInputText';
import StyledText from '../components/StyledText';
import palette from '../themes/Colors';
import customStyles from '../themes/CustomStyles';
import AppContainer from '../components/AppContainer';

interface StepProps {
  setProgress: (progress: number) => void;
}

const Information: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  useEffect(() => {
    setProgress(75);
  }, [setProgress]);
  return (
    <AppContainer>
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>

          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>Personal Information</StyledText>
            <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please complete the required information fields</StyledText>
          </View>

          <View style={[styles.separatorContainer, customStyles.mb4]}></View>
          <View style={styles.bodyContent}>
            <StyledInputText labelText="First Name" placeholder="First Name"></StyledInputText>
            <StyledInputText labelText="Last Name" placeholder="Last Name"></StyledInputText>
            <StyledInputText labelText="Street Address" placeholder="Start typing your street... (e.g. 28 Mai...)"></StyledInputText>
            <StyledInputText labelText="Unit/Apt Number (optional)" placeholder="Address Line 2"></StyledInputText>
            <StyledInputText labelText="City" placeholder="City"></StyledInputText>
            <StyledInputText labelText="State" placeholder="Ohio" placeholderTextColor={palette.accent200}></StyledInputText>
            <StyledInputText labelText="Zip Code" placeholder="Zip Code"></StyledInputText>
            <View style={[styles.idContainer]}>
              <StyledText>Identity Verification</StyledText>
              <StyledInputText labelText="Your Date of Birth" placeholder="MM/DD/YYYY"></StyledInputText>
              <StyledInputText labelText="Your Social Security Number (SSN)" placeholder="9 digit number"></StyledInputText>
            </View>
            <StyledText color='accent200'>By selecting the 'Confirm Operation' option, you are agreeing to our terms and conditions, and will proceed with the account creation process.</StyledText>
            <StyledInputText labelText="Email" placeholder="Email"></StyledInputText>
            <StyledInputText labelText="Password" placeholder="Password"></StyledInputText>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.footer]}>
        <Button
          title="Accept"
          style={[styles.button]}
          size='long'
          useGradient={true}
          onPress={() => { setProgress(100); navigation.navigate('Success') }}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  parent: {
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
    marginBottom: 100
  },
  bodyContent: {
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
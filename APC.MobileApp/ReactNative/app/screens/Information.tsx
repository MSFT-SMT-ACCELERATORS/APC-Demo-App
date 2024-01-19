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
import AppContainer from '../components/AppContainer';

interface StepProps {
  setProgress: (progress: number) => void;
}

const Information: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  // setProgress(75);
  useEffect(() => {
    setProgress(75);
  }, [setProgress]);
  return (
    <AppContainer>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Personal Information</Text>
          <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: "normal", alignSelf: "center", width: '100%', textAlign: 'center' }}> Please complete the required information fields</Text>
          <StyledInputText labelText="First Name" placeholder="First Name"></StyledInputText>
          <StyledInputText labelText="Last Name" placeholder="Last Name"></StyledInputText>
          <StyledInputText labelText="Street Address" placeholder="Start typing your street... (e.g. 28 Mai...)"></StyledInputText>
          <StyledInputText labelText="Unit/Apt Number (optional)" placeholder="Address Line 2"></StyledInputText>
          <StyledInputText labelText="City" placeholder="City"></StyledInputText>
          <StyledInputText labelText="State" placeholder="Ohio" placeholderTextColor={palette.accent200}></StyledInputText>
          <StyledInputText labelText="Zip Code" placeholder="Zip Code"></StyledInputText>
          <View style={styles.idContainer}>
            <StyledText textStyle='small'>Identity Verification</StyledText>
            <StyledInputText labelText="Your Date of Birth" placeholder="MM/DD/YYYY"></StyledInputText>
            <StyledInputText labelText="Your Social Security Number (SSN)" placeholder="9 digit number"></StyledInputText>
          </View>
          <StyledText textStyle='small' color='accent200'>By selecting the 'Confirm Operation' option, you are agreeing to our terms and conditions, and will proceed with the account creation process.</StyledText>
          <StyledInputText labelText="Email" placeholder="Email"></StyledInputText>
          <StyledInputText labelText="Password" placeholder="Password"></StyledInputText>
          <Button
            title="Submit"
            style={styles.button}
            onPress={() => { setProgress(100); navigation.navigate('Success') }}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    justifyContent: 'flex-start',
    gap: 5,
    padding: 15
  },
  idContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: palette.primary100,
    backgroundColor: palette.primary200,
    padding: 40,
    marginHorizontal: 10,
    marginBottom: 10
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
    paddingHorizontal: 30, // Aplica márgenes horizontales al contenedor del separador
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary100
  }
});

export default Information;
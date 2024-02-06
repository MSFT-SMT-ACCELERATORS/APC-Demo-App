import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Button from '../components/Button'
import CheckboxWithText from '../components/CheckBox';
import AppContainer from '../components/AppContainer';
import StyledText from '../components/StyledText';
import customStyles from '../themes/CustomStyles';
import palette from '../themes/Colors';

function Consents() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <AppContainer>
      <View style={[styles.contentContainer]}>
        <View style={[styles.title]}>
          <StyledText customStyle={['title2', 'extrabold']}>Consents</StyledText>
          <StyledText customStyle={['big', 'regular']}>Please review and confirm.</StyledText>
        </View>

        <View style={[styles.separatorContainer, customStyles.mb4]}></View>

        <View style={[styles.bodyContent]}>
          <StyledText style={{ textAlign: 'justify' }} customStyle={['regular', 'standar']}>This application is secured based on the mobile phone line used, checking that the provided information matches certain checks performed by the carrier's network APIs.</StyledText>
          <StyledText style={{ textAlign: 'justify' }} customStyle={['regular', 'standar']}>This demo application uses Microsoft Azure Programmable Connectivity (APC) as a single platform interface and under the covers it communicates with any of the multiple supported carriers such as TELEFONICA, ORANGE, AT&T, DT, Singtel, etc.</StyledText>

          <CheckboxWithText label={'I authorize and consent this application to verify data such as phone number identification, phone location and SIM swap, for fraud detection safety'} checked={isChecked} onToggle={() => {setIsChecked(!isChecked) }} />

        </View>
      </View>
      <View style={[styles.footer]}>
        <Button
          title="Accept"
          style={[styles.button]}
          size='long'
          useGradient={true}
          onPress={() => navigation.navigate('Steps')}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
    gap: 10
  },
  contentContainer: {
    flex: 1,
    width: '100%'
  },
  bodyContent: {
    justifyContent: 'center',
    gap: 25,
    padding: 15,
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
    // flex: 1,
    width: 300,
    alignSelf:'center',
    borderBottomWidth:3,
    borderBlockColor: palette.primary100
  },
  separator: {
    // height: 1,
    // backgroundColor: Colors.primary100
  }
});

export default Consents;
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledText from '../components/StyledText';
import AppContainer from '../components/AppContainer';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import InputText from '../components/StyledInputText';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import Colors from '../themes/Colors';
import Slider from '../components/Slider';

const currencyFormatter = (value:number)=>{
  return "$" + new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0, // Esto asegura que no haya decimales
  }).format(value);
}

function Landing() {
  const navigation = useNavigation();
  const [value, setValue] = useState('first');
  
  return (
    <AppContainer style={styles.container}>
      <StyledInputText labelText="Nombre:" placeholder="Introduce tu nombre"></StyledInputText>
      <StyledText textStyle="title1">Título 1</StyledText>
      <StyledText textStyle="title2">Título 2</StyledText>
      <StyledText textStyle="big">Texto grande</StyledText>
      <StyledText textStyle="title3" color="accent200">Título 3 en color primario 100</StyledText>
      <StatusBar style="auto" />
      <Slider minValue={100} maxValue={10000} formatter={currencyFormatter} />
      <Button
        title="Get Started"
        // style={styles.button}
        onPress={() => navigation.navigate('Consents')}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Establece los márgenes horizontales deseados
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default Landing;
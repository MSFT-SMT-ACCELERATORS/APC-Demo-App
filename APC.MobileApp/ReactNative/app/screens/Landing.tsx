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

      <View style={styles.comparisonContainer}>
        <StyledText style={styles.comparisonTitle} textStyle="big">Internal Comparison with:</StyledText>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <View style={styles.option}>
            <View style={{width:35}}></View>
            <View>
              <StyledText textStyle="title3">True GPS</StyledText>
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
          <View style={styles.option}>
            <RadioButton value="hacked" />
            <View>
              <StyledText textStyle="title3">Hacked GPS</StyledText>
              <View style={styles.optionSubtitleContainer}>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>US - NY - New York</StyledText>
                </View>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>40.61454, -73.82024</StyledText>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.option}>
            <RadioButton value="acp" />
            <View >
              <StyledText textStyle="title3">Azure Programmable Connectivity Backend</StyledText>
              <View style={styles.optionSubtitleContainer}>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>US - Ohio - Massillon</StyledText>
                </View>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>40.79161, -81.52079</StyledText>
                </View>
              </View>
            </View>
          </View>
        </RadioButton.Group>
      </View>

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
  },
  comparisonContainer: {
    backgroundColor: Colors.secondary100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8e8e97',
    paddingHorizontal: 1,
    width: '100%'
  },
  comparisonTitle: {
    alignSelf: 'center',
    width: 'auto',
    marginBottom: 10
  },
  option: {
    flexDirection: 'row',
    marginVertical:10
  },
  optionSubtitleContainer: {
    flexDirection: 'row',
    gap: 5
  },
  optionSubtitleBadge: {
    backgroundColor: Colors.secondary200,
    paddingHorizontal: 5,
    borderRadius: 10
  }
});

export default Landing;
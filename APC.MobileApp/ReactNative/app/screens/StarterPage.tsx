import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import Colors from '../themes/Colors';
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar';
import StyledText from '../components/StyledText';
import StyledInputText from '../components/StyledInputText';
import palette from '../themes/Colors';
import Slider from '../components/Slider';
import AppContainer from '../components/AppContainer';
import customStyles from '../themes/CustomStyles';

interface StepProps {
  setProgress: (progress: number) => void;
}

const StarterPage: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  // setProgress(50)
  useEffect(() => {
    setProgress(50);
  }, [setProgress]);
  return (
    <ScrollView style={styles.container} >
      <View >
        <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Let’s get started</Text>
        <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: "normal", alignSelf: "center", width: '100%', textAlign: 'center' }}>Please complete the form below.</Text>
        <StyledInputText labelText="Phone Number" placeholder="+1 365-478-8429" placeholderTextColor={palette.accent200}></StyledInputText>
        <StyledText customStyle={['small']}>I would like to formally request a loan for the following amount:</StyledText>
        <Slider minValue={500} maxValue={10000} formatter={currencyFormatter} style={{ padding: 10 }} />
        <StyledText customStyle={['small']}>Purpose:</StyledText>
        <View style={styles.btn_Container}>
          <View style={styles.row}>
            <Button
              title='Debt Consolidation'
              titleSize={customStyles.small}
              titleColor={'accent200'}
              style={[customStyles.my3]}
              size='square'
              showIcon={true}
              outline={true}
              iconLib='MaterialIcons'
              iconName={'attach-money'}
              iconSize={50}
              iconColor={palette.accent200}
              onPress={() => navigation.navigate('#')}
            />
            <Button
              title='Monthly Bills'
              titleSize={customStyles.small}
              titleColor={'accent200'}
              style={[customStyles.my3]}
              size='square'
              showIcon={true}
              outline={true}
              iconLib='Ionicons'
              iconName={'calendar-outline'}
              iconSize={50}
              iconColor={palette.accent200}
              onPress={() => navigation.navigate('#')}
            />
          </View>
          <View style={styles.row}>
            <Button
              title='Moving'
              titleSize={customStyles.small}
              titleColor={'accent200'}
              style={[customStyles.my3]}
              size='square'
              showIcon={true}
              outline={true}
              iconLib='MaterialCommunity'
              iconName={'truck-check-outline'}
              iconSize={45}
              iconColor={palette.accent200}
              onPress={() => navigation.navigate('#')}
            />
            <Button
              title='Others'
              titleSize={customStyles.small}
              titleColor={'accent200'}
              style={[customStyles.my3]}
              size='square'
              showIcon={true}
              outline={true}
              iconLib='Ionicons'
              iconName={'wallet-outline'}
              iconSize={50}
              iconColor={palette.accent200}
              onPress={() => navigation.navigate('#')}
            />
          </View>
        </View>

        <Button
          title="Submit"
          style={customStyles.my3}
          useGradient={true}
          size='long'
          onPress={() => navigation.navigate('#')}
        />
      </View>
    </ScrollView>
  );
}

const currencyFormatter = (value: number) => {
  return "$" + new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0, // Esto asegura que no haya decimales
  }).format(value);
}

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
    width: '100%',
    paddingHorizontal: 30,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary100
  },
  btn_Container: {
    marginVertical: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon_button: {
    margin: 5,
    flex: 1
  },
});

export default StarterPage;
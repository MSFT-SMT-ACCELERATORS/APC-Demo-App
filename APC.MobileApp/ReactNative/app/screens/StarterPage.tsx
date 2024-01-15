import * as React from 'react';
import { useState } from 'react';
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

function ResidenceLocation() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} >
      <View >
        <ProgressBar progress={10} height={15} />
        <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Let’s get started</Text>
        <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: "normal", alignSelf: "center", width: '100%', textAlign: 'center' }}>Please complete the form below.</Text>
        <StyledInputText labelText="Phone Number" placeholder="+1 365-478-8429" placeholderTextColor={palette.accent200}></StyledInputText>
        <StyledText textStyle='small'>I would like to formally request a loan for the following amount:</StyledText>
        <StyledText textStyle='small'>Purpose:</StyledText>
        <View style={styles.btn_Container}>
          <View style={styles.row}>
            <Button
              title="Debt Consolidation"
              style={styles.icon_button}
              onPress={() => navigation.navigate('')}
            />
            <Button
              title="Monthly Bills"
              style={styles.icon_button}
              onPress={() => navigation.navigate('')}
            />
          </View>
          <View style={styles.row}>
            <Button
              title="Moving"
              style={styles.icon_button}
              onPress={() => navigation.navigate('')}
            />
            <Button
              title="Other"
              style={styles.icon_button}
              onPress={() => navigation.navigate('')}
            />
          </View>
        </View>

        <Button
          title="Submit"
          style={styles.button}
          onPress={() => navigation.navigate('Information')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
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

export default ResidenceLocation;
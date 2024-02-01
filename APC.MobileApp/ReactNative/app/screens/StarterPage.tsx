import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button'
import StyledText from '../components/StyledText';
import StyledInputText from '../components/StyledInputText';
import palette from '../themes/Colors';
import Slider from '../components/Slider';
import AppContainer from '../components/AppContainer';
import customStyles from '../themes/CustomStyles';

interface StepProps {
  setProgress: (progress: number) => void;
}

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 200;

const StarterPage: React.FC<StepProps> = ({ setProgress }) => {
  const navigation = useNavigation();
  // setProgress(50)
  useEffect(() => {
    setProgress(50);
  }, [setProgress]);
  return (
    <AppContainer>
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>

          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>Let’s get started</StyledText>
            <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please complete the form below.</StyledText>
          </View>

          <View style={[styles.separatorContainer, customStyles.mb4]}></View>
          <View style={styles.bodyContent}>
            <StyledInputText labelText="Phone Number" placeholder="+1 365-478-8429" inputType='tel'></StyledInputText>
            <StyledText customStyle={['standar']}>I would like to formally request a loan for the following amount:</StyledText>
            <Slider minValue={500} maxValue={10000} stepSize={100} formatter={currencyFormatter} style={{ padding: 10 }} />
            <StyledText customStyle={['standar']}>Purpose:</StyledText>
            <View>
              <View style={styles.row}>
                <Button
                  title='Debt Consolidation'
                  titleSize={customStyles.small}
                  titleColor={'accent200'}
                  style={[customStyles.my3, customStyles.mr1, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
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
                  style={[customStyles.my2, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
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
                  style={[customStyles.my3, customStyles.mr1, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
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
                  style={[customStyles.my3, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
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
          </View>
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            title="Next"
            style={[styles.button]}
            size='long'
            useGradient={true}
            onPress={() => { setProgress(100); navigation.navigate('Information') }}          />
        </View>
      </View>
    </AppContainer>
  );
}

const currencyFormatter = (value: number) => {
  return "$" + new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0, // Esto asegura que no haya decimales
  }).format(value);
}

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallIconButton: {
    flex: .5
  },
  largeIconButton:{
    flex: 1
  }
});

export default StarterPage;

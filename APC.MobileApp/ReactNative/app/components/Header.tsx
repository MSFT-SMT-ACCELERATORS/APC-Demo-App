import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import palette from '../themes/Colors';

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={[styles.content]}>
        <Image source={require('../../assets/images/logo.png')} style={[styles.logo]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 70,
    backgroundColor: palette.primary200,
    borderBottomWidth : 3,
    borderBottomColor: palette.primary100
  },
  content: {
    backgroundColor: palette.primary200,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  logo: {
    width: '100%',
    resizeMode: "contain",
    height: 50,
  },
});

export default Header;
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Colors from '../themes/Colors';

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.image} resizeMode="contain"/>        
        </View>
        <View style={styles.separator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary200,
    height: Constants.statusBarHeight + 70,
    paddingTop: Constants.statusBarHeight
  },
  imageContainer: {
    backgroundColor: Colors.primary200,
    padding: 10,
    height: 70,
    width: '100%'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  separator: {    
    backgroundColor: Colors.primary100,
    height: 2
  }
});

export default Header;
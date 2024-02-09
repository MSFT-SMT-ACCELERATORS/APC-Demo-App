import * as React from 'react';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import palette from '../themes/Colors';

function Header() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="leftcircleo" size={30} color={palette.accent200} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 70,
    backgroundColor: palette.primary200,
    borderBottomWidth : 3,
    borderBottomColor: palette.primary100
  },
  content: {
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
  backButton: {
    position: 'absolute',
    left: 15,
  }
});

export default Header;
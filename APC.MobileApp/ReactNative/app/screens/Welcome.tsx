import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Colors from '../themes/Colors';

function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, {'padding': 3}]}>
        <Image source={require('../../assets/logo.png')} style={styles.image} resizeMode="contain"/>
      </View>
      <Text style={{'fontSize': 40, 'color': '#FFF', fontWeight: "bold" }}>Your Loan, Just a Touch Away</Text>
      <Text style={{'fontSize': 30, 'color': '#AAA', fontWeight: "100" }}>Get a Persolal Line of Credit Between</Text>
      <Text style={{'fontSize': 30, 'color': Colors.accent200, fontWeight: "300" }}>$500 - $10000</Text>
      <StatusBar style="auto" />
      <Button
        title="Get Started"
        style={styles.button}
        onPress={() => navigation.navigate('Consents')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
    padding: 15
  },
  imageContainer:{
    width: '100%',
    height: 90
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginTop: 30
  }
});

export default Welcome;
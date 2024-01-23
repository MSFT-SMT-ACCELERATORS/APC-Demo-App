import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Colors from '../themes/Colors';
import StyledText from '../components/StyledText';

function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.image} resizeMode="contain" />
      <StyledText customStyle={["title1", 'extrabold']}>Your Loan, Just a Touch Away</StyledText>
      <StyledText customStyle={["title2", "light"]}>Get a Personal Line of Credit Between</StyledText>
      <StyledText customStyle={["title2"]} color='accent200'>$500 - $10000</StyledText>
      <StatusBar style="auto" />
      <Button
        title="Get Started"
        style={styles.button}
        onPress={() => navigation.navigate('Consents')}
      />
      <Button
        title="DEMO"
        style={styles.button}
        onPress={() => navigation.navigate('Demo')}
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
    padding: 15,

  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    maxWidth: 300, 
    maxHeight: 100,
  },
  button: {
    marginTop: 30
  }
});

export default Welcome;
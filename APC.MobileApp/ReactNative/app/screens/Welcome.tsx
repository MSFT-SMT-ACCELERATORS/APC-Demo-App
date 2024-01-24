import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Colors from '../themes/Colors';
import StyledText from '../components/StyledText';
import AppContainer from '../components/AppContainer';
import customStyles from '../themes/CustomStyles';
import palette from '../themes/Colors';

function Welcome() {
  const navigation = useNavigation();

  return (
    <AppContainer>
      <View style={styles.settings}>
        <Button
          showIcon={true}
          size='fit'
          iconLib='Ionicons'
          iconName={'settings-outline'}
          iconColor={palette.accent200}
          iconSize={30}
          style={[customStyles.mr2, customStyles.mt2]}
          useGradient={false}
          onPress={() => navigation.navigate('Demo')}
        />
      </View>
      <View style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.image} resizeMode='contain' />
        <StyledText customStyle={['title1', 'extrabold']}>Your Loan, Just a Touch Away</StyledText>
        <StyledText customStyle={['title2', 'light']}>Get a Personal Line of Credit Between</StyledText>
        <StyledText customStyle={['title2']} color='accent200'>$500 - $10000</StyledText>
        <StatusBar style='auto' />
        <Button
          title='Get Started'
          style={customStyles.my3}
          useGradient={true}
          onPress={() => navigation.navigate('Consents')}
        />

      </View>
    </AppContainer>
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
  settings: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: 0
  }
});

export default Welcome;
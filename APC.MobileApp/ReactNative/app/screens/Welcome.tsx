import * as React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Colors from '../themes/Colors';
import AppContainer from '../components/AppContainer';
import customStyles from '../themes/CustomStyles';
import palette from '../themes/Colors';
import StyledText from '../components/StyledText';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/AntDesign';



interface WelcomeProps {
  setLoading: (isLoading: boolean, text?: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ setLoading }) => {
  const navigation = useNavigation();
  const [isWifiConnected, setIsWifiConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
    });

    const networkUnsubscribe = NetInfo.addEventListener(state => {
      const wifiConnected = state.isConnected && state.type === 'wifi' || false;
      setIsWifiConnected(wifiConnected);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <AppContainer >
      <StatusBar style='light' />
      <View style={[styles.container]}>
        <View style={styles.settings}>
          <Button
            showIcon={true}
            size='fit'
            iconLib='Ionicons'
            iconName={'settings-outline'}
            iconColor={palette.accent200}
            iconSize={30}
            style={[customStyles.mr1]}
            useGradient={false}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        {/* {isWifiConnected && 
            <StyledText style={ styles.warningMessage }>
                <Icon name="warning" size={20} color={palette.accent200} />
                {' '} This demo app relays on Cell-Network and currently needs the Wi-Fi to be disabled in the phone
            </StyledText>
        } */}

        <View style={[styles.bodyContainer]}>
          <Image source={require('../../assets/images/logo.png')} style={styles.image} resizeMode='contain' />
          <StyledText customStyle={['title1', 'extrabold']}>Your loan, just a touch away</StyledText>
          <StyledText customStyle={['title2', 'light']}>Get a personal line of credit between</StyledText>
          <StyledText customStyle={['title2']} color='accent200'>$500 - $10000</StyledText>
          <Button
            title='Get started'
            size='normal'
            style={customStyles.my4}
            useGradient={true}
            onPress={() => navigation.navigate('Consents')}
          />

        </View>

      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: Colors.primary300,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 15,
    padding: 10
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3.1,
    maxWidth: 300,
    maxHeight: 100,
  },
  container: {
    flex: 1,
    backgroundColor: palette.primary300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: Constants.statusBarHeight + 10,
    width: '100%'
  },
  settings: {
    alignSelf: 'flex-end'
  },
  warningMessage: {
    padding: 15,
    backgroundColor: '#252533',
}
});

export default Welcome;

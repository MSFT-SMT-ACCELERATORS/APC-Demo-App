import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Button from '../components/Button'
import CheckboxWithText from '../components/CheckBox';
import AppContainer from '../components/AppContainer';
import StyledText from '../components/StyledText';
import customStyles from '../themes/CustomStyles';
import palette from '../themes/Colors';

interface ConsentsProps {
  setLoading: (isLoading: boolean, text?: string) => void;
}

const Consents: React.FC<ConsentsProps> = ({ setLoading }) => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (

    <AppContainer>
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>

          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>Consents</StyledText>
            <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please review and confirm</StyledText>
          </View>

          <View style={[styles.separatorContainer, customStyles.mb4]}></View>
          <View style={styles.bodyContent}>
            <StyledText style={{ textAlign: 'justify' }} customStyle={['regular', 'standar']}>This application is secured based on the mobile phone line used, checking that the provided information matches certain checks performed by the carrier's network APIs.</StyledText>
            <StyledText style={{ textAlign: 'justify' }} customStyle={['regular', 'standar']}>This demo application uses Microsoft Azure Programmable Connectivity (APC) as a single platform interface and under the covers it communicates with any of the multiple supported carriers such as TELEFONICA, ORANGE, AT&T, DT, Singtel, etc.</StyledText>

            <CheckboxWithText label={'I authorize and consent this application to verify data such as phone number identification, phone location and SIM swap, for fraud detection safety'} checked={isChecked} onToggle={() => { setIsChecked(!isChecked) }} />

          </View>
        </ScrollView>
      </View>

      <View style={[styles.footer]}>
        <Button
          title="Accept"
          style={[styles.button]}
          size='long'
          useGradient={true}
          onPress={() => navigation.navigate('Steps')}
          disabled={!isChecked}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    width: '100%',
    backgroundColor: palette.primary300
  },
  title: {
    width: '100%',
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
    gap: 10
  },
  contentContainer: {
    flex: 1,
    width: '100%'
  },
  bodyContent: {
    justifyContent: 'center',
    gap: 25,
    padding: 15,
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
  }
});

export default Consents;

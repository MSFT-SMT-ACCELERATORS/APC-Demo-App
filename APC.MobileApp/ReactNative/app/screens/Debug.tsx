import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeConfigurations, readConfigurations, updateConfiguration, AppConfiguration } from '../utils/ConfigStorage'

import Colors from '../themes/Colors';
import Button from '../components/Button'

import palette from '../themes/Colors';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useEffect, useState } from 'react';
import textStyles from '../themes/Texts';
import Checkbox from '../components/CheckBox';
import AppContainer from '../components/AppContainer';
import * as APCService from '../utils/APCService'
import { LocationObjectCoords } from 'expo-location';
import { useApiClient } from '../api/ApiClientProvider';

function Debug() {
    const navigation = useNavigation();
    const apiClient = useApiClient();

    const [ip, setIP] = useState('');
    const [ipify, setIpify] = useState('');
    const [location, setLocation] = useState<LocationObjectCoords>();
    const [phoneNumber, setPhoneNumber] = useState('');


    useEffect(() => {
        APCService.getIPAddress().then(setIP).catch(setIP);
        APCService.ipify().then(setIpify).catch(setIpify);
        APCService.getDeviceGPSLocation().then((loc) => setLocation(loc?.coords));
        APCService.getPhoneNumber(apiClient).then(setPhoneNumber)

    }, []);
    return (
        <AppContainer>
            <ScrollView style={styles.container}>
                <View>
                    <StyledInputText labelText='IP' value={ip} ></StyledInputText>
                    <StyledInputText labelText='IP (ipify)' value={ipify} ></StyledInputText>
                    <StyledInputText labelText='True GPS' value={location?.latitude + ', ' + location?.longitude} ></StyledInputText>
                    <StyledInputText labelText='Phone Number' value={phoneNumber} ></StyledInputText>
                    
                    <Button
                        title="Back"
                        style={styles.button}
                        useGradient={true}
                        onPress={() => navigation.navigate('Welcome')}
                    />
                </View>
            </ScrollView>
        </AppContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 70,
        flex: 1,
        backgroundColor: Colors.primary300,
        // justifyContent: 'flex-start',
        gap: 5,
        padding: 15
    },
    button: {
        marginTop: 30,
        alignSelf: 'flex-end',
        width: '100%'
    }
});

export default Debug;
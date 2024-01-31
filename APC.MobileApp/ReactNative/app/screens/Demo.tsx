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

function Demo() {
    const navigation = useNavigation();
    const [config, setConfig] = useState<AppConfiguration>({
        offlineMode: false,
        offlineLatitude: 0,
        offlineLongitude: 0,
        offlineSimSwapDetected: false,
        radiusKm: 10,
        apcMockMode: false
    });

    useEffect(() => {
        const loadConfig = async () => {
            const savedConfig = await readConfigurations();
            if (savedConfig) {
                const mergedConfig = { ...config, ...savedConfig };
                setConfig(mergedConfig);
            }
        };

        loadConfig();
    }, []);

    const handleConfigurationChange = async <T extends keyof AppConfiguration>(key: T, value: AppConfiguration[T]) => {
        await updateConfiguration(key, value);

        setConfig(prevConfig => ({ ...prevConfig, [key]: value }));
    };

    const parseFloat = (value: string) => {
        return value === '' ? 0 : (Number.parseFloat(value) || 0);
    }

    return (
        <AppContainer>
            <ScrollView style={styles.container}>
                <View>
                    <StyledInputText labelText='Radius Km (allowed gps deviation)' value={config.radiusKm.toString()} onChangeText={(newText) => handleConfigurationChange('radiusKm', parseFloat(newText))}></StyledInputText>

                    <Checkbox label={'Offline Mode'}
                        checked={config.offlineMode}
                        onToggle={() => handleConfigurationChange('offlineMode', !config.offlineMode)} />

                    <View style={[{ marginHorizontal: 20, marginTop: 5 }, !config.offlineMode && { display: 'none' }]}>
                        <Checkbox label={'SIM swap detected'}
                            checked={config.offlineSimSwapDetected}
                            onToggle={() => handleConfigurationChange('offlineSimSwapDetected', !config.offlineSimSwapDetected)} />

                        <StyledInputText labelText='X Coords' value={config.offlineLatitude.toString()} onChangeText={(newText) => handleConfigurationChange('offlineLatitude', parseFloat(newText))}></StyledInputText>
                        <StyledInputText labelText='Y Coords' value={config.offlineLongitude.toString()} onChangeText={(newText) => handleConfigurationChange('offlineLongitude', parseFloat(newText))}></StyledInputText>
                    </View>

                    <Checkbox label={'APC Mock mode'}
                        checked={config.apcMockMode}
                        onToggle={() => handleConfigurationChange('apcMockMode', !config.apcMockMode)} />

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

export default Demo;
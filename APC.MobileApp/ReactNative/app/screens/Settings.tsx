import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../themes/Colors';
import { storeConfigurations, readConfigurations, updateConfiguration, AppConfiguration, defaultConfig } from '../utils/SettingsService'

import AppContainer from '../components/AppContainer';
import Button from '../components/Button'
import CheckboxWithText from '../components/CheckBox';
import StyledInputText from '../components/StyledInputText';

function Settings() {
    const navigation = useNavigation();
    const [config, setConfig] = useState<AppConfiguration>(defaultConfig);

    useEffect(() => {
        const loadConfig = async () => {
            const savedConfig = await readConfigurations();
            const mergedConfig = { ...config, ...savedConfig };
            setConfig(mergedConfig);
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

                    <CheckboxWithText label={'Offline Mode'}
                        checked={config.offlineMode}
                        onToggle={() => handleConfigurationChange('offlineMode', !config.offlineMode)} />

                    {
                        config.offlineMode ?
                            <View style={[{ marginHorizontal: 30, marginTop: 5 }]}>
                                <StyledInputText labelText='Last sim swap' value={config.offlineLastSimChange} onChangeText={(newText) => handleConfigurationChange('offlineLastSimChange', newText)}></StyledInputText>
                                <StyledInputText labelText='APC Latitude' value={config.offlineLatitude.toString()} onChangeText={(newText) => handleConfigurationChange('offlineLatitude', parseFloat(newText))}></StyledInputText>
                                <StyledInputText labelText='APC Longitude' value={config.offlineLongitude.toString()} onChangeText={(newText) => handleConfigurationChange('offlineLongitude', parseFloat(newText))}></StyledInputText>
                                <StyledInputText labelText='APC Phone Number' value={config.offlinePhoneNumber} onChangeText={(newText) => handleConfigurationChange('offlinePhoneNumber', newText)}></StyledInputText>
                            </View>
                            : null
                    }

                    <CheckboxWithText label={'APC Mock mode'}
                        checked={config.apcMockMode}
                        onToggle={() => handleConfigurationChange('apcMockMode', !config.apcMockMode)} />

                    <Button
                        title="Save"
                        style={styles.button}
                        useGradient={true}
                        onPress={() => {}}
                    />
                    <Button
                        title="Back"
                        style={styles.button}
                        useGradient={true}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </ScrollView>
        </AppContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.primary300,
        gap: 5,
        padding: 15
    },
    button: {
        marginTop: 30,
        alignSelf: 'flex-end',
        width: '100%'
    }
});

export default Settings;
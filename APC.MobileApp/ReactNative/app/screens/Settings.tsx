import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../themes/Colors';
import { storeConfigurations, readConfigurations, updateConfiguration, AppConfiguration, defaultConfig, ConnectionMode } from '../utils/SettingsService'

import AppContainer from '../components/AppContainer';
import Button from '../components/Button'
import StyledInputText from '../components/StyledInputText';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import StyledText from '../components/StyledText';
import { RadioButton } from 'react-native-paper';

function Settings() {
    const navigation = useNavigation();
    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm<AppConfiguration>({ defaultValues: defaultConfig })
    const connectionMode = watch('connectionMode');

    useEffect(() => {
        const loadConfig = async () => {
            const config = await readConfigurations();
            reset(config);
        };

        loadConfig();
    }, []);

    const saveConfig: SubmitHandler<AppConfiguration> = async (data) => {
        const formattedData = {
            ...data,
            radiusKm: typeof data.radiusKm === 'string' ? parseFloat(data.radiusKm) : data.radiusKm,
            offlineLatitude: typeof data.offlineLatitude === 'string' ? parseFloat(data.offlineLatitude) : data.offlineLatitude,
            offlineLongitude: typeof data.offlineLongitude === 'string' ? parseFloat(data.offlineLongitude) : data.offlineLongitude,

        };
        console.log(formattedData);
        storeConfigurations(data);
    }

    return (
        <AppContainer>
            <ScrollView style={styles.container}>
                <View>
                    
                    <Button
                        title="Save"
                        style={styles.button}
                        useGradient={true}
                        onPress={handleSubmit(saveConfig)}
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
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    group: {
        padding: 10
    }
});

export default Settings;
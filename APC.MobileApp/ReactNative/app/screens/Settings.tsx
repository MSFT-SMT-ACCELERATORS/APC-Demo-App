import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
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
                    <Controller
                        name="radiusKm"
                        control={control}
                        rules={{
                            validate: {
                                isNumber: value => !isNaN(value) || "The value must be a number."
                            }
                        }}
                        render={({ field }) => (
                            <StyledInputText
                                labelText="Radius Km (allowed gps deviation)"
                                value={field.value?.toString() || ''}
                                onChangeText={field.onChange}
                            />
                        )}
                    />
                    {errors.radiusKm && <StyledText customStyle={['regular']} color='danger200'>{errors.radiusKm.message}</StyledText>}

                    <Controller
                        control={control}
                        name='connectionMode'
                        rules={{ required: 'Please select an option' }}
                        render={({ field: { onChange, value } }) => (
                            <RadioButton.Group onValueChange={onChange} value={value}>
                                <View style={styles.group}>
                                    <StyledText>Connection Mode</StyledText>

                                    <TouchableOpacity style={styles.flex} onPress={() => onChange(ConnectionMode.Online)}>
                                        <RadioButton.Android value={ConnectionMode.Online} color={Colors.accent200} />
                                        <StyledText>Full online</StyledText>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.flex} onPress={() => onChange(ConnectionMode.Mock)}>
                                        <RadioButton.Android value={ConnectionMode.Mock} color={Colors.accent200} />
                                        <StyledText>Mock APC</StyledText>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.flex} onPress={() => onChange(ConnectionMode.Offline)}>
                                        <RadioButton.Android value={ConnectionMode.Offline} color={Colors.accent200} />
                                        <StyledText>Offline</StyledText>
                                    </TouchableOpacity>
                                </View>
                            </RadioButton.Group>
                        )}
                    />

                    {true || connectionMode == ConnectionMode.Offline ?
                        <View style={[{ marginHorizontal: 30, marginTop: 5 }]}>
                            <Controller
                                name='offlineLastSimChange'
                                control={control}
                                render={({ field }) => (
                                    <StyledInputText labelText='Last sim swap' value={field.value}></StyledInputText>
                                )}
                            />

                            <Controller
                                name='offlineLatitude'
                                control={control}
                                rules={{
                                    validate: {
                                        isNumber: value => !isNaN(value) || "The value must be a number.",
                                        isValidLatitude: value => (-90 <= value && value <= 90) || "The value must be a number between -90 and 90."
                                    }
                                }}
                                render={({ field }) => (
                                    <StyledInputText
                                        labelText='APC Latitude'
                                        value={field.value?.toString() || ''}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                            {errors.offlineLatitude && <StyledText customStyle={['regular']} color='danger200'>{errors.offlineLatitude.message}</StyledText>}

                            <Controller
                                name='offlineLongitude'
                                control={control}
                                rules={{
                                    validate: {
                                        isNumber: value => !isNaN(value) || "The value must be a number.",
                                        isValidLongitude: value => (-180 <= value && value <= 180) || "The value must be a number between -180 and 180."
                                    }
                                }}
                                render={({ field }) => (
                                    <StyledInputText
                                        labelText='APC Longitude'
                                        value={field.value?.toString() || ''}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                            {errors.offlineLongitude && <StyledText customStyle={['regular']} color='danger200'>{errors.offlineLongitude.message}</StyledText>}

                            <Controller
                                name='offlinePhoneNumber'
                                control={control}
                                render={({ field }) => (
                                    <StyledInputText
                                        labelText='APC Phone Number'
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                        </View>
                        : null}

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
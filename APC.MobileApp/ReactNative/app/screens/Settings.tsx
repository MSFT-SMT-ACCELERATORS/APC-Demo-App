import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../themes/Colors';
import {
    storeConfigurations,
    readConfigurations,
    AppConfiguration,
    defaultConfig,
    ConnectionMode,
} from '../Services/SettingsService';

import AppContainer from '../components/AppContainer';
import Button from '../components/Button';
import StyledInputText from '../components/StyledInputText';
import {
    Controller,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import StyledText from '../components/StyledText';
import { RadioButton, TextInput } from 'react-native-paper';
import palette from '../themes/Colors';
import CheckboxWithText from '../components/CheckBox';
import { Logger } from '../utils/Logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

interface SettingsProps {
    setLoading: (isLoading: boolean, text?: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ setLoading }) => {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<AppConfiguration>({ defaultValues: defaultConfig });
    const [geolocationCheck, setGeolocationCheck] = useState<boolean>(false);
    const [autovalidatePhoneNumber, setAutovalidatePhoneNumber] =
        useState<boolean>(false);
    const [simSwap, setSimSwap] = useState<boolean>(false);
    const connectionMode = watch('connectionMode');
    const [logContent, setLogContent] = useState<string | undefined | null>();

    useEffect(() => {
        AsyncStorage.getItem("log").then(setLogContent);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(false);

            const loadConfig = async () => {
                const config = await readConfigurations();
                reset(config);
                setGeolocationCheck(config.skipGeolocationCheck || false);
                setAutovalidatePhoneNumber(config.autovalidatePhoneNumber || false);
                setSimSwap(config.offlineLastSimChange || false);
            };

            loadConfig();
        });

        return unsubscribe;
    }, [navigation]);

    const saveConfig: SubmitHandler<AppConfiguration> = async (data) => {
        let updatedAutovalidatePhoneNumber = autovalidatePhoneNumber;
        let updatedSimSwap = simSwap;

        if (connectionMode === 'online') {
            updatedAutovalidatePhoneNumber = false;
            updatedSimSwap = false;
        }

        const formattedData = {
            ...data,
            radiusKm: Number(data.radiusKm),
            offlineLatitude: Number(data.offlineLatitude),
            offlineLongitude: Number(data.offlineLongitude),
            skipGeolocationCheck: geolocationCheck,
            autovalidatePhoneNumber: updatedAutovalidatePhoneNumber,
            offlineLastSimChange: updatedSimSwap,
            residenceLocationRadius: Number(data.residenceLocationRadius)
        };

        Logger.log(formattedData);
        storeConfigurations(formattedData);
        navigation.navigate('Welcome');
    };


    return (
        <AppContainer>
            <View style={[styles.parent]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
                >
                    <ScrollView style={styles.contentContainer}>
                        <View style={styles.bodyContent}>

                            <View style={styles.sectionContent}>
                                <StyledText customStyle={['bold', 'title4']} color='accent200'>Global settings</StyledText>
                                <Controller
                                    name="radiusKm"
                                    control={control}
                                    rules={{
                                        validate: {
                                            isNumber: (value) =>
                                                !isNaN(value) ||
                                                'The value must be a number.',
                                            isWithinRange: (value) =>
                                                value <= 10 ||
                                                'The allowed range is up to 10km.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <StyledInputText
                                            labelText="Radius Km (allowed gps deviation)"
                                            value={field.value?.toString() || ''}
                                            onChangeText={field.onChange}
                                        />
                                    )}
                                />
                                {errors.radiusKm && (
                                    <StyledText
                                        customStyle={['regular']}
                                        color="danger200"
                                    >
                                        {errors.radiusKm.message}
                                    </StyledText>
                                )}

                                <Controller
                                    name="residenceLocationRadius"
                                    control={control}
                                    rules={{
                                        validate: {
                                            isNumber: (value) =>
                                                !isNaN(value) ||
                                                'The value must be a number.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <StyledInputText
                                            labelText="Radius Km (allowed deviation for residence location)"
                                            value={field.value?.toString() || ''}
                                            onChangeText={field.onChange}
                                        />
                                    )}
                                />
                                {errors.residenceLocationRadius && (
                                    <StyledText
                                        customStyle={['regular']}
                                        color="danger200"
                                    >
                                        {errors.residenceLocationRadius.message}
                                    </StyledText>
                                )}

                                <Controller
                                    name="skipGeolocationCheck"
                                    control={control}
                                    render={() => (
                                        <CheckboxWithText
                                            label={
                                                'Exclude phone location verification'
                                            }
                                            checked={geolocationCheck}
                                            onToggle={() => {
                                                setGeolocationCheck(!geolocationCheck);
                                            }}
                                        />
                                    )}
                                ></Controller>
                            </View>


                            <View style={styles.sectionContent}>
                                <StyledText customStyle={['bold', 'title4']} color='accent200'>Connection mode</StyledText>
                                <Controller
                                    control={control}
                                    name="connectionMode"
                                    rules={{ required: 'Please select an option' }}
                                    render={({ field: { onChange, value } }) => (
                                        <RadioButton.Group
                                            onValueChange={onChange}
                                            value={value}
                                        >
                                            <View style={styles.sectionContent}>
                                                <Pressable
                                                    style={styles.flex}
                                                    onPress={() =>
                                                        onChange(ConnectionMode.Online)
                                                    }
                                                >
                                                    <RadioButton.Android
                                                        value={ConnectionMode.Online}
                                                        color={Colors.accent200}
                                                    />
                                                    <StyledText>Full online</StyledText>
                                                </Pressable>

                                                <Pressable
                                                    style={styles.flex}
                                                    onPress={() =>
                                                        onChange(ConnectionMode.Mock)
                                                    }
                                                >
                                                    <RadioButton.Android
                                                        value={ConnectionMode.Mock}
                                                        color={Colors.accent200}
                                                    />
                                                    <StyledText>Mock APC</StyledText>
                                                </Pressable>

                                                <Pressable
                                                    style={styles.flex}
                                                    onPress={() =>
                                                        onChange(ConnectionMode.Offline)
                                                    }
                                                >
                                                    <RadioButton.Android
                                                        value={ConnectionMode.Offline}
                                                        color={Colors.accent200}
                                                    />
                                                    <StyledText>Offline</StyledText>
                                                </Pressable>
                                            </View>
                                        </RadioButton.Group>
                                    )}
                                />
                            </View>

                            {connectionMode == ConnectionMode.Offline ? (
                                <View style={styles.sectionContent}>
                                    <StyledText style={styles.sectionTitle} customStyle={['bold', 'title4']} color='accent200'>Offline mode settings</StyledText>
                                    <Controller
                                        name="autovalidatePhoneNumber"
                                        control={control}
                                        render={() => (
                                            <CheckboxWithText
                                                label={
                                                    'Autovalidate phone number'
                                                }
                                                checked={autovalidatePhoneNumber}
                                                onToggle={() => {
                                                    setAutovalidatePhoneNumber(
                                                        !autovalidatePhoneNumber
                                                    );
                                                }}
                                            />
                                        )}
                                    ></Controller>

                                    <Controller
                                        name="offlineLastSimChange"
                                        control={control}
                                        render={() => (
                                            <CheckboxWithText
                                                label={'Line SIM was swapped recently'}
                                                checked={simSwap}
                                                onToggle={() => {
                                                    setSimSwap(!simSwap);
                                                }}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="offlineLatitude"
                                        control={control}
                                        rules={{
                                            validate: {
                                                isNumber: (value) =>
                                                    !isNaN(value) ||
                                                    'The value must be a number.',
                                                isValidLatitude: (value) =>
                                                    (-90 <= value && value <= 90) ||
                                                    'The value must be a number between -90 and 90.',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <StyledInputText
                                                labelText="Simulated APC Latitude"
                                                value={
                                                    field.value?.toString() || ''
                                                }
                                                onChangeText={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.offlineLatitude && (
                                        <StyledText
                                            customStyle={['regular']}
                                            color="danger200"
                                        >
                                            {errors.offlineLatitude.message}
                                        </StyledText>
                                    )}

                                    <Controller
                                        name="offlineLongitude"
                                        control={control}
                                        rules={{
                                            validate: {
                                                isNumber: (value) =>
                                                    !isNaN(value) ||
                                                    'The value must be a number.',
                                                isValidLongitude: (value) =>
                                                    (-180 <= value &&
                                                        value <= 180) ||
                                                    'The value must be a number between -180 and 180.',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <StyledInputText
                                                labelText="Simulated APC Longitude"
                                                value={
                                                    field.value?.toString() || ''
                                                }
                                                onChangeText={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.offlineLongitude && (
                                        <StyledText
                                            customStyle={['regular']}
                                            color="danger200"
                                        >
                                            {errors.offlineLongitude.message}
                                        </StyledText>
                                    )}
                                </View>
                            ) : null}



                            <View style={styles.sectionContent}>
                                <StyledText customStyle={['bold', 'title4']} color='accent200'>Logging</StyledText>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button title="Clear logs" onPress={() => { AsyncStorage.removeItem("log"); setLogContent(null) }} useGradient={true}></Button>
                                    <Button title="Copy" disabled={!(logContent)} onPress={() => { Clipboard.setStringAsync(logContent ?? '') }} useGradient={true}></Button>
                                </View>
                                <TextInput multiline={true} editable={false}>
                                    {logContent}
                                </TextInput>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[styles.footer]}>
                        <Button
                            title="Save and close"
                            style={[styles.button]}
                            size="long"
                            useGradient={true}
                            onPress={handleSubmit(saveConfig)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </AppContainer>
    );
};

const styles = StyleSheet.create({
    parent: {
        width: ' 100%',
        flex: 1,
        backgroundColor: palette.primary300,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingTop: 0,
        marginBottom: 120,
    },
    button: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bodyContent: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        gap: 25,
    },
    sectionTitle: {
        marginBottom: 20
    },
    sectionContent: {
        flexDirection: 'column',
        gap: 15,
        padding: 15,
        backgroundColor: '#252533',
        borderRadius: 10
    },
    footer: {
        width: '100%',
        height: undefined,
    },
});

export default Settings;

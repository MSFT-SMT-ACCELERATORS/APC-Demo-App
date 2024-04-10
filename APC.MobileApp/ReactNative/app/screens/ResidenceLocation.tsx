import * as React from 'react';
import * as Location from 'expo-location';
import { readConfigurations, AppConfiguration, ConnectionMode, } from '../Services/SettingsService';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, FieldValues, useForm } from 'react-hook-form';

import * as APCService from '../Services/APCService';
import { useApiClient } from '../api/ApiClientProvider';
import { Position } from '../Services/APCService';

import * as BingService from '../Services/BingService';

import palette from '../themes/Colors';
import customStyles from '../themes/CustomStyles';

import Button from '../components/Button';
import StyledText from '../components/StyledText';
import StyledInputText from '../components/StyledInputText';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import CustomModal from '../components/CustomModal';
import { RadioButton, Modal, } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Pressable, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, NativeSyntheticEvent, TextInputFocusEventData, findNodeHandle, UIManager, TextInput, Keyboard, } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { Logger } from '../utils/Logger';
import { useStep } from '../utils/StepContext';

interface StepProps {
    setProgress: (progress: number) => void;
    setLoading: (isLoading: boolean, text?: string) => void;
}

const ResidenceLocation: React.FC<StepProps> = ({
    setProgress,
    setLoading,
}) => {
    const navigation = useNavigation();
    const { setCurrentStep } = useStep();
    const scrollRef = useRef<ScrollView>(null);
    const countryRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const [focusedInputRef, setFocusedInputRef] = useState<React.RefObject<TextInput> | null>(null);
    const apiClient = useApiClient();
    const [hackedGPS, setHackedGPS] = useState<Location.LocationObjectCoords>();
    const [gpsPosition, setGPSPosition] = useState<Position>();
    const [config, setConfig] = useState<AppConfiguration>();
    const [skipGeolocationCheck, setSkipLocation] = useState<boolean>(true);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const [showModalIcon, setModalIcon] = useState(true);
    const [modalBackground, setModalBackground] = useState('');
    const [modalIconName, setIcon] = useState('');
    const [modalIconColor, setColorIcon] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(true);
    const [countryQuery, setCountryQuery] = useState<string>('');
    const [countrySuggestions, setCountrySuggestions] = useState<any>([]);
    const [selectedCountry, setCountryValue] = useState('');
    const [stateQuery, setStateQuery] = useState<string>('');
    const [stateSuggestions, setStateSuggestions] = useState<any>([]);
    const [selectedState, setStateValue] = useState('');
    const [cityQuery, setCityQuery] = useState<string>('');
    const [citiesSuggestions, setCitySuggestions] = useState<string[]>([]);
    const [selectedCity, setCityValue] = useState('');

    useEffect(() => {
        (async () => {
            const currentConfig = await readConfigurations(); // Solo si necesitas cargarlo aquí.
            setConfig(currentConfig);

            if (currentConfig?.skipGeolocationCheck) {
                console.log("Skipping geolocation check based on configuration.");
                setHasLocationPermission(false);
                return;
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
            Logger.log('STATUS: ' + status);
            if (status !== 'granted') {
                setHasLocationPermission(false);
                return;
            }

            setHasLocationPermission(true);

            APCService.getDeviceGPSLocation()
            .then(setGPSPosition)
            .catch(Logger.error);

        })();
    }, []);
    

    const handleModalToggle = (
        title: string,
        text: string,
        backgroundColor: string = palette.danger100,
        showIcon: boolean = true,
        iconName: string = 'warning-outline',
        iconColor: string = palette.danger200
    ) => {
        setModalIcon(showIcon);
        setModalTitle(title);
        setModalText(text);
        setModalVisible(!modalVisible);
        setModalBackground(backgroundColor);
        setIcon(iconName);
        setColorIcon(iconColor);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Country: '',
            City: '',
            StateProvince: '',
            UseAPC: true,
            GPSOption: 'true',
        },
    });

    const handleCountryChange = async (query: string) => {
        setCountryQuery(query);
        setCountryValue('');

        setStateQuery('');
        setStateSuggestions([]);
        setStateValue('');

        setCityQuery('');
        setCitySuggestions([]);
        setCityValue('');

        setHackedGPS(undefined);

        if (query.length > 1) {
            const suggestions = await BingService.getCountrySuggestions(query);
            const uniqueSuggestions = Array.from(new Set(suggestions));
            setCountrySuggestions(uniqueSuggestions);
        } else {
            setCountrySuggestions([]);
        }
    };

    const handleCountrySuggestion = (suggestion: string) => {
        setCountryQuery(suggestion);
        setCountrySuggestions([]);
        setCountryValue(suggestion);
        Keyboard.dismiss();
    };

    const handleStateChange = async (query: string) => {
        setStateQuery(query);
        setStateValue('');

        setCityQuery('');
        setCitySuggestions([]);
        setCityValue('');

        setHackedGPS(undefined);

        if (query.length >= 2) {
            const suggestions = await BingService.getStateSuggestions(query, selectedCountry);
            const uniqueSuggestions = Array.from(new Set(suggestions));
            setStateSuggestions(uniqueSuggestions);
        } else {
            setStateSuggestions([]);
        }
    };

    const handleStateSuggestion = (suggestion: string) => {
        setStateQuery(suggestion);
        setStateSuggestions([]);
        setStateValue(suggestion);
        Keyboard.dismiss();
    };


    const handleCityChange = async (query: string) => {
        setCityQuery(query);
        setCityValue('');
        setHackedGPS(undefined);

        if (query.length > 1) {
            const suggestions = await BingService.getCitySuggestions(query, selectedCountry, selectedState);
            const uniqueSuggestions = Array.from(new Set(suggestions));
            setCitySuggestions(uniqueSuggestions);
        } else {
            setCitySuggestions([]);
        }
    };

    const handleCitySuggestion = async (suggestion: string) => {
        setCityValue(suggestion);
        setCityQuery(suggestion);
        setCitySuggestions([]);
        Keyboard.dismiss();

        const hackedLocation = await BingService.getCityCoordinates(suggestion, selectedCountry);
        Logger.log(`handleCitySuggestion:`, suggestion, JSON.stringify(hackedLocation));
        setHackedGPS(
            APCService.getLocationCoords(
                hackedLocation?.latitude,
                hackedLocation?.longitude
            )
        );
    };


    const onFormValid = async (data: FieldValues) => {
        try {

            // Business validation
            Logger.log('validating business rule');
            if (config?.skipGeolocationCheck || !hasLocationPermission) {
                setShouldNavigate(true);
                setLoading(false);
                return
            }

            const networkCode = await APCService.getNetworkCode(apiClient);
            Logger.log('Submitted Data: ', data);
            setLoading(true, 'Validating your data...');


            const selectedLocation = await BingService.getCityCoordinates(selectedCity, selectedCountry);
            if (!selectedCity) {
                Logger.log('Selection required');
                handleModalToggle('Selection required', 'Select a valid location to continue', '#dadaed', undefined, 'information-circle-outline', palette.black);
                setLoading(false);

                return;
            }

            let coordsForm = APCService.getLocationCoords(
                selectedLocation?.latitude,
                selectedLocation?.longitude
            );

            Logger.log('Get: device gps location');
            let coordsGPS = await APCService.getDeviceGPSLocation();
            Logger.log('Get: device gps location OK');

            let coords: Location.LocationObjectCoords;
            if (data.GPSOption == 'true') coords = coordsGPS.coords;
            else coords = coordsForm;

            let hasError = false;



            if (!(await APCService.matchesCoords(coords, coordsForm, config?.residenceLocationRadius!))) {
                handleModalToggle(
                    'Blocking business rule: Not allowed device location',
                    'For anti-fraud purposes, this application requires the user to be using the app in a location relatively close to the user’s residence location (i.e. same state). You are currently far away'
                );
                Logger.log('Business validation failed!!');
                hasError = true;
            } else {
                if (!data.UseAPC) {
                    handleModalToggle('Warning', 'APC Check Skipped: Location authenticity not verified. Enable APC for fraud protection', palette.warning, undefined, 'information-circle-outline', palette.black);
                    setShouldNavigate(true);
                    Logger.log('Business validation success!!');
                } else {  //APC Validation
                    Logger.log('USING APC validating apc matches location');
                    const response = await APCService.verificateAPCLocation(apiClient, coords);
                    if (!response) {
                        handleModalToggle(
                            'Blocking anti-hacking rule: GPS coordinates hacking attempted',
                            'A possible hacking has been detected. The device GPS location does not match the device’s actual location provided by the network carrier. The application’s flow must stop'
                        );
                        Logger.log('APC validation failed!!');
                        hasError = true;
                    } else {
                        handleModalToggle('Information message', 'Congratulations, you have been verified in a location close to your residence location so you can continue with the loan request', palette.accent200, undefined, 'information-circle-outline', palette.black);
                        setShouldNavigate(true);
                        Logger.log('APC validation success!!');
                    }
                }
            }

        } catch (error) {
            Logger.log(error);
            setSkipLocation(true);
            handleModalToggle('Warning', 'The application cannot check your location', palette.warning, undefined, 'information-circle-outline', palette.black);
            setShouldNavigate(true);
        } finally {
            setLoading(false);
        }
    };

    const showTooltip = () => setTooltipVisible(true);
    const hideTooltip = () => setTooltipVisible(false);

    useEffect(() => {
        if (!modalVisible && shouldNavigate) {
            setTimeout(() => {
                navigation.navigate('Information');
                setShouldNavigate(false);
            }, 100);
        }
    }, [modalVisible, shouldNavigate, navigation]);

    useEffect(() => {
        setCurrentStep(2);
      }, [setCurrentStep]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(false);
            setProgress(66.6);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (config) {
            setSkipLocation(config.skipGeolocationCheck ?? false);
            Logger.log('LOC' + skipGeolocationCheck + " " + config.skipGeolocationCheck);
        }
    }, [config, skipGeolocationCheck]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (focusedInputRef && focusedInputRef.current) {
                const scrollViewNode = findNodeHandle(scrollRef.current);
                focusedInputRef.current.measureLayout(
                    scrollViewNode!,
                    (x, y, width, height) => {
                        scrollRef.current?.scrollTo({ y: y - 40, animated: true });
                    },
                    () => Logger.error("Failed to measure layout."),
                );
            }
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, [focusedInputRef]);

    const handleFocus = (inputRef: React.RefObject<TextInput>) => (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocusedInputRef(inputRef);
    };

    return (
        <AppContainer>
            <View style={[styles.parent]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 165 : 165}
                >
                    <ScrollView style={[styles.contentContainer]} ref={scrollRef} keyboardShouldPersistTaps="handled">
                        <View style={[styles.title]}>
                            <StyledText customStyle={['title2', 'extrabold']}>
                                Residence location
                            </StyledText>
                            <StyledText
                                style={{ textAlign: 'center' }}
                                customStyle={['title5', 'regular']}
                            >
                                Please, select your country and state/province of
                                residence{'  '}
                                <Icon
                                    name="infocirlceo"
                                    size={20}
                                    color={palette.accent200}
                                    onPress={showTooltip}
                                />
                            </StyledText>
                        </View>

                        <View style={[styles.separatorContainer, customStyles.mb4]}>
                        </View>

                        <View style={styles.bodyContent}>
                            <Controller name='Country' control={control} render={({ field }) => (
                                <>
                                    <StyledInputText customStyle={['mb0']} labelText="Country" value={countryQuery} onChangeText={handleCountryChange} placeholder="Select a Country..." ref={countryRef} onFocus={handleFocus(countryRef)} />
                                    {countrySuggestions.length > 0 && (
                                        <FlatList style={styles.sectionContent} data={countrySuggestions} scrollEnabled={false} keyboardShouldPersistTaps="handled"
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => { field.onChange(item); handleCountrySuggestion(item) }}>
                                                    <StyledText customStyle={['m4']}>{item}</StyledText>
                                                    <View style={[styles.separatorList]}></View>
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    )}
                                </>
                            )}
                            />


                            <Controller name='StateProvince' control={control} render={({ field }) => (
                                <>
                                    <StyledInputText customStyle={['mb0']} labelText="State/Province" value={stateQuery} onChangeText={handleStateChange} placeholder="Select a State/Province..." editable={selectedCountry != ''} ref={stateRef} onFocus={handleFocus(stateRef)} />
                                    {stateSuggestions.length > 0 && (
                                        <FlatList style={styles.sectionContent} data={stateSuggestions} scrollEnabled={false} keyboardShouldPersistTaps="handled"
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => { field.onChange(item); handleStateSuggestion(item) }}>
                                                    <StyledText customStyle={['m4']}>{item}</StyledText>
                                                    <View style={[styles.separatorList]}></View>
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    )}
                                </>
                            )}
                            />


                            <Controller
                                name='City'
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <StyledInputText customStyle={['mb0']} labelText="City" value={cityQuery} onChangeText={handleCityChange} placeholder="Select a City..." editable={selectedState != ''} ref={cityRef} onFocus={handleFocus(cityRef)} />
                                        {citiesSuggestions.length > 0 && (
                                            <FlatList style={styles.sectionContent} data={citiesSuggestions} scrollEnabled={false} keyboardShouldPersistTaps="handled"
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity style={styles.itemList} onPress={() => { field.onChange(item); handleCitySuggestion(item) }}>
                                                        <StyledText customStyle={['m4']}>{item}</StyledText>
                                                        <View style={[styles.separatorList]}></View>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        )}
                                    </>
                                )}
                            />

                            {!skipGeolocationCheck && hasLocationPermission && (
                                <View style={styles.btnGroup}>
                                    <StyledText style={styles.comparisonTitle}> Internal comparison with:</StyledText>
                                    <Controller control={control} name="GPSOption" rules={{ required: 'Please select an option', }}
                                        render={({ field: { onChange, value }, }) => (
                                            <RadioButton.Group onValueChange={onChange} value={value} >
                                                <View>
                                                    <View>
                                                        <Pressable onPress={() => onChange('true')}>
                                                            <View style={styles.flex}>
                                                                <RadioButton.Android value="true" color={palette.accent200} />
                                                                <StyledText>Device GPS</StyledText>
                                                            </View>
                                                            <View style={styles.optionSubtitleContainer} >
                                                                {gpsPosition && gpsPosition.location ? (
                                                                    <View style={styles.optionSubtitleBadge} >
                                                                        <StyledText>
                                                                            {gpsPosition.location.country}{' '}-{' '}
                                                                            {gpsPosition.location.state}{' '}-{' '}
                                                                            {gpsPosition.location.city}
                                                                        </StyledText>
                                                                    </View>
                                                                ) : null}
                                                                {gpsPosition && gpsPosition.coords ? (
                                                                    <View style={styles.optionSubtitleBadge} >
                                                                        <StyledText>
                                                                            {gpsPosition.coords.latitude.toFixed(4)} ,{' '}
                                                                            {gpsPosition.coords.longitude.toFixed(4)}
                                                                        </StyledText>
                                                                    </View>
                                                                ) : null}
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Pressable onPress={() => onChange('hacked')} >
                                                        <View style={styles.flex}>
                                                            <RadioButton.Android value="hacked" color={palette.accent200} />
                                                            <StyledText> Hacked GPS </StyledText>
                                                        </View>
                                                        {selectedCountry && selectedState && selectedCity ? (
                                                            <View style={styles.optionSubtitleContainer} >

                                                                <View style={[styles.optionSubtitleBadge,]} >
                                                                    <StyledText>
                                                                        {selectedCountry}{' '}-{' '}
                                                                        {selectedState}{' '}-{' '}
                                                                        {selectedCity}
                                                                    </StyledText>
                                                                </View>
                                                                <View style={styles.optionSubtitleBadge} >
                                                                    <StyledText>
                                                                        {hackedGPS?.latitude},{' '}
                                                                        {hackedGPS?.longitude}
                                                                    </StyledText>
                                                                </View>
                                                            </View>
                                                        ) : null}
                                                    </Pressable>
                                                </View>

                                                <View style={[styles.dangerSeparator, customStyles.my5,]}></View>

                                                <View>
                                                    <Controller control={control} name="UseAPC"
                                                        render={({ field: { onChange, value, }, }) => (
                                                            <Pressable onPress={() => onChange(!value)} >
                                                                <View style={styles.flex} >
                                                                    <CheckboxWithText label="Use Azure Programmable Connectivity backend" checked={value}
                                                                        onToggle={() => onChange(!value)} />
                                                                </View>
                                                            </Pressable>
                                                        )}
                                                    />
                                                </View>
                                            </RadioButton.Group>
                                        )}
                                    />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                    <View style={[styles.footer]}>
                        <Button
                            title="Next"
                            style={[styles.button]}
                            size="long"
                            useGradient={true}
                            onPress={handleSubmit(onFormValid)}
                        />
                    </View>
                </KeyboardAvoidingView>

                <Modal
                    visible={tooltipVisible}
                    onDismiss={hideTooltip}
                    contentContainerStyle={styles.tooltip}
                >
                    <StyledText
                        customStyle={['standarSm', 'bold']}
                        color="black"
                    >
                        You need to be using this app in an area relatively
                        close to your residence location (i.e. The same
                        state/province).
                    </StyledText>
                </Modal>
            </View>
            <CustomModal
                visible={modalVisible}
                onClose={() => handleModalToggle('', '', '', false, '', '')}
                showIcon={showModalIcon}
                iconName={modalIconName}
                iconColor={modalIconColor}
                title={modalTitle}
                text={modalText}
                backgroundColor={modalBackground}

            />
        </AppContainer>
    );
};

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        flex: 1,
        backgroundColor: palette.primary300,
    },
    title: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        gap: 10,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingTop: 0,

    },
    bodyContent: {
        width: '100%',
        justifyContent: 'center',
        gap: 25,
    },
    sectionContent: {
        flexDirection: 'column',
        gap: 0,
        padding: 20,
        backgroundColor: '#252533',
        marginTop: -36,
        marginHorizontal: 10,
    },
    itemList: {
        //item List styles
    },
    idContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: palette.primary100,
        backgroundColor: palette.primary200,
        padding: 30,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    footer: {
        width: '100%',
        marginTop: 120,
        height: undefined,
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
        borderBlockColor: palette.primary100,
    },
    dangerSeparator: {
        width: 300,
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderBlockColor: palette.secondary200,
    },
    separatorList: {
        width: '100%',
        borderBottomWidth: 3,
        borderBlockColor: palette.primary100,
    },
    btnGroup: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: palette.secondary200,
        backgroundColor: palette.secondary100,
        padding: 30,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallIconButton: {
        flex: 0.5,
    },
    largeIconButton: {
        flex: 1,
    },
    comparisonTitle: {
        textAlign: 'center',
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    optionSubtitleContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    optionSubtitleBadge: {
        backgroundColor: palette.secondary200,
        paddingHorizontal: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tooltip: {
        position: 'absolute',
        top: 50,
        color: '#000',
        alignSelf: 'center',
        padding: 20,
        backgroundColor: palette.neutral,
    },
    tooltipContent: {
        color: palette.accent200,
    },
    iconPicker: {
        paddingTop: 12,
    },
});

export default ResidenceLocation;

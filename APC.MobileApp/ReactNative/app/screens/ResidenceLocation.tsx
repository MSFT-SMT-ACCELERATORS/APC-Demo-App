import * as React from 'react';
import * as Location from 'expo-location';
import { readConfigurations, AppConfiguration, ConnectionMode, } from '../utils/SettingsService';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, FieldValues, useForm } from 'react-hook-form';

import * as APCService from '../utils/APCService';
import { useApiClient } from '../api/ApiClientProvider';
import { Position } from '../utils/APCService';

import * as BingService from '../utils/BingService';

import palette from '../themes/Colors';
import customStyles from '../themes/CustomStyles';

import cities from '../utils/cities.json';
import countries from '../utils/countries.json'
import Button from '../components/Button';
import StyledText from '../components/StyledText';
import StyledInputText from '../components/StyledInputText';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import CustomModal from '../components/CustomModal';
import { RadioButton, Modal, } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Pressable, FlatList, TouchableOpacity, } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

interface StepProps {
    setProgress: (progress: number) => void;
    setLoading: (isLoading: boolean, text?: string) => void;
}

const ResidenceLocation: React.FC<StepProps> = ({
    setProgress,
    setLoading,
}) => {
    const navigation = useNavigation();
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
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [stateQuery, setStateQuery] = useState<string>('');
    const [stateSuggestions, setStateSuggestions] = useState<any>([]);
    const [selectedState, setSelectedValue] = useState('');
    const [cityQuery, setCityQuery] = useState<string>('');
    const [citiesSuggestions, setCitySuggestions] = useState<string[]>([]);
    const [selectedCity, setCityValue] = useState('');



    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('STATUS:' + status);
            if (status !== 'granted') {
                setHasLocationPermission(false);
                return;
            }

            setHasLocationPermission(true);
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
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            Country: '',
            City: '',
            StateProvince: '',
            UseAPC: true,
            GPSOption: 'true',
        },
    });

    const handleCountryChange = async (country: string) => {
        if (!country) return;

        setValue('Country', country);
        setSelectedCountry(country);
    };

    const handleStateChange = async (query: string) => {
        setStateQuery(query);
        if (query.length >= 2) {
            const suggestions = await BingService.getStateSuggestions(query, selectedCountry);
            const uniqueSuggestions = Array.from(new Set(suggestions));
            setStateSuggestions(uniqueSuggestions);
        } else {
            setStateSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setStateQuery(suggestion);
        setStateSuggestions([]);
        setSelectedValue(suggestion);
    };


    const handleCityChange = async (query: string) => {
        setCityQuery(query);
        if (query.length > 1) {
            const suggestions = await BingService.getCitySuggestions(query, selectedCountry, selectedState);
            const uniqueSuggestions = Array.from(new Set(suggestions));
            setCitySuggestions(uniqueSuggestions);
        } else {
            setCitySuggestions([]);
        }
    };

    const handleCitySuggestion = async (suggestion: string) => {
        setCityQuery(suggestion);
        setCitySuggestions([]);
        setCityValue(suggestion);
        const hackedLocation = await BingService.getCityCoordinates(selectedCity, selectedCountry);
        setHackedGPS(
            APCService.getLocationCoords(
                hackedLocation?.latitude,
                hackedLocation?.longitude
            )
        );
    };


    const onFormValid = async (data: FieldValues) => {
        try {
            const networkCode = await APCService.getNetworkCode(apiClient);
            console.log(`El código de red es: ${networkCode}`);
            console.log('Submitted Data:', data);
            setLoading(true, 'Validating your data...');


            const selectedLocation = await BingService.getCityCoordinates(selectedCity, selectedCountry);
            if (!selectedCity) {
                console.log('Selection required');
                handleModalToggle('Selection required', 'Select a valid option from the drop-down menus to continue', '#dadaed', undefined, 'information-circle-outline', palette.black);
                setLoading(false);

                return;
            }

            let coordsForm = APCService.getLocationCoords(
                selectedLocation?.latitude,
                selectedLocation?.longitude
            );

            console.log('Get: device gps location');
            let coordsGPS = await APCService.getDeviceGPSLocation();
            console.log('Get: device gps location OK');

            let coords: Location.LocationObjectCoords;
            if (data.GPSOption == 'true') coords = coordsGPS.coords;
            else coords = coordsForm;

            let hasError = false;


            // Business validation
            console.log('validating business rule');
            if (config?.skipGeolocationCheck || !hasLocationPermission) {
                setShouldNavigate(true);
                setLoading(false);
                return
            }

            if (!(await APCService.matchesCoords(coords, coordsForm, config?.residenceLocationRadius!))) {
                handleModalToggle(
                    'Blocking business rule: Not allowed device location',
                    'For anti-fraud purposes, this application requires the user to be using the app in a location relatively close to the user’s residence location (i.e. same state). You are currently far away'
                );
                console.log('Business validation failed!!');
                hasError = true;
            } else {
                if (!data.UseAPC) {
                    handleModalToggle('Warning', 'APC Check Skipped: Location authenticity not verified. Enable APC for fraud protection', palette.warning, undefined, 'information-circle-outline', palette.black);
                    setShouldNavigate(true);
                    console.log('Business validation success!!');
                } else {  //APC Validation
                    console.log('USING APC validating apc matches location');
                    const response = await APCService.verificateAPCLocation(apiClient, coords);
                    if (!response) {
                        handleModalToggle(
                            'Blocking anti-hacking rule: GPS coordinates hacking attempted',
                            'A possible hacking has been detected. The device GPS location does not match the device’s actual location provided by the network carrier. The application’s flow must stop'
                        );
                        console.log('APC validation failed!!');
                        hasError = true;
                    } else {
                        handleModalToggle('Information message', 'Congratulations, you have been verified in a location close to your residence location so you can continue with the loan request', palette.accent200, undefined, 'information-circle-outline', palette.black);
                        setShouldNavigate(true);
                        console.log('APC validation success!!');
                    }
                }
            }

        } catch (error) {
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
                navigation.navigate('StarterPage');
                setShouldNavigate(false);
            }, 100);
        }
    }, [modalVisible, shouldNavigate, navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(false);
            setProgress(25);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        readConfigurations().then(setConfig);
        APCService.getDeviceGPSLocation()
            .then(setGPSPosition)
            .catch(console.error);

        const firstCountry = cities
            .map((item) => item.country)
            .filter((value, index, self) => self.indexOf(value) === index)[0];

        handleCountryChange(firstCountry);
    }, []);

    useEffect(() => {
        if (config) {
            setSkipLocation(config.skipGeolocationCheck ?? false);
            console.log('LOC' + skipGeolocationCheck + " " + config.skipGeolocationCheck);
        }
    }, [config, skipGeolocationCheck]);
    return (
        <AppContainer>
            <View style={[styles.parent]}>
                <ScrollView style={[styles.contentContainer]}>
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

                    <View
                        style={[styles.separatorContainer, customStyles.mb4]}
                    ></View>
                    <View style={styles.bodyContent}>
                        <Controller name="Country" control={control} defaultValue="" render={({ field }) => (
                            <RNPickerSelect style={pickerStyle} darkTheme={true}
                                value={field.value || ''}
                                onValueChange={handleCountryChange}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => {
                                    return (
                                        <Ionicons
                                            name="chevron-down"
                                            size={24}
                                            color={palette.neutral}
                                            style={styles.iconPicker}
                                        />
                                    );
                                }}
                                items={countries.map((country) => {
                                    return {
                                        label: country.country,
                                        value: country.country,
                                    };
                                })}
                            />
                        )}
                        />
                        {errors.Country && (
                            <StyledText
                                customStyle={['regular']}
                                color="danger200"
                            >
                                {errors.Country.message}
                            </StyledText>
                        )}

                        <Controller name='StateProvince' control={control} render={({ field }) => (
                            <>
                                <StyledInputText customStyle={['mb0']} labelText="State/Province" value={stateQuery} onChangeText={handleStateChange} placeholder="Select a State/Province..."/>
                                {stateSuggestions.length > 0 && (
                                    <FlatList style={styles.sectionContent} data={stateSuggestions}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
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
                                    <StyledInputText customStyle={['mb0']} labelText="City" value={cityQuery} onChangeText={handleCityChange} placeholder="Select a City..." />
                                    {citiesSuggestions.length > 0 && (
                                        <FlatList style={styles.sectionContent} data={citiesSuggestions}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.itemList} onPress={() => handleCitySuggestion(item)}>
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
        marginBottom: 120,
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
        // borderRadius: 10,
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
        // alignSelf: 'center',
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

const pickerStyle: PickerStyle = {
    inputWeb: {
        fontSize: 20,
        padding: 10,
        margin: 12,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: palette.accent200,
    },
    inputIOS: {
        fontSize: 20,
        padding: 10,
        margin: 12,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: palette.accent200,
    },
    inputAndroid: {
        fontSize: 20,
        padding: 10,
        margin: 12,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: palette.accent200,
    },
};

export default ResidenceLocation;

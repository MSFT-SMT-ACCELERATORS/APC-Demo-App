import * as React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../themes/Colors';
import Button from '../components/Button';
import palette from '../themes/Colors';
import {
    RadioButton,
    Modal,
} from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useEffect, useState } from 'react';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { LocationObjectCoords } from 'expo-location';
import * as APCService from '../utils/APCService';
import { useApiClient } from '../api/ApiClientProvider';
import cities from '../utils/cities.json';
import customStyles from '../themes/CustomStyles';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import { Position } from '../utils/APCService';
import {
    readConfigurations,
    AppConfiguration,
    ConnectionMode,
} from '../utils/SettingsService';
import CustomModal from '../components/CustomModal';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';

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
    const [hackedGPS, setHackedGPS] = useState<LocationObjectCoords>();
    const [gpsPosition, setGPSPosition] = useState<Position>();
    const [apcPosition, setAPCPosition] = useState<Position>();
    const [config, setConfig] = useState<AppConfiguration>();
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const [showModalIcon, setModalIcon] = useState(true);
    const [modalBackground, setModalBackground] = useState('');
    const [modalIconName, setIcon] = useState('');
    const [modalIconColor, setColorIcon] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);

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

    const handleCountryChange = (country: string) => {
        if (!country) return;

        setValue('Country', country);
        const firstStateOption =
            cities
                .filter((item) => item.country === country)
                .map((item) => item.state)[0] || '';
        setValue('StateProvince', firstStateOption);
        handleStateChange(firstStateOption);
    };
    const handleStateChange = (state: string) => {
        if (!state) return;

        setValue('StateProvince', state);
        const firstCityOption =
            cities
                .filter(
                    (item) =>
                        item.country == getValues('Country') &&
                        item.state === state
                )
                .map((item) => item.city)[0] || '';
        setValue('City', firstCityOption);
        handleCityChange(firstCityOption);
    };
    const handleCityChange = (city: string) => {
        if (!city) return;

        setValue('City', city);
        const selectedCity = cities.filter(
            (d) =>
                d.country == getValues('Country') &&
                d.state == getValues('StateProvince') &&
                d.city == city
        )[0];
        setHackedGPS(
            APCService.getLocationCoords(
                selectedCity.latitude,
                selectedCity.longitude
            )
        );
    };

    const onFormValid = async (data: FieldValues) => {
        console.log('Submitted Data:', data);
        setLoading(true, 'Validating your data...');

        if (data.Country === 'Select a country') {
            console.log('Selection required');
            handleModalToggle('Selection required', 'Please select a valid option from the "Select a country" dropdown to proceed.', '#dadaed', undefined, 'information-circle-outline', palette.black);
            setLoading(false);
            return;

        }

        const selectedCity = cities.filter(
            (d) =>
                d.country == data.Country &&
                d.state == data.StateProvince &&
                d.city == data.City
        )[0];

        let coordsForm = APCService.getLocationCoords(
            selectedCity.latitude,
            selectedCity.longitude
        );
        console.log('Get: device gps location');
        let coordsGPS = await APCService.getDeviceGPSLocation();
        console.log('Get: device gps location OK');

        let coords: LocationObjectCoords;
        if (data.GPSOption == 'true') coords = coordsGPS.coords;
        else coords = coordsForm;

        let hasError = false;




        // Business validation
        console.log('validating business rule');
        if (!(await APCService.matchesCoords(coords, coordsForm))) {
            handleModalToggle(
                'Blocking business rule: Not allowed device location',
                ' For anti-fraud purposes, this application requires the user to be using the app in a location relatively close to the user’s residence location (i.e. same state). You are currently far away.'
            );
            console.log('Business validation failed!!');
            hasError = true;
        } else {

            if (config?.skipGeolocationCheck) {
                // handleModalToggle('APC unchecked', '', palette.accent200, false);
                setShouldNavigate(true);
                setLoading(false);

                return
            }
            if (!data.UseAPC) {
                handleModalToggle('APC unchecked', '', palette.accent200, undefined, 'information-circle-outline', palette.black);
                setShouldNavigate(true);
                console.log('Business validation success!!');
            } else {  //APC Validation
                console.log('USING APC validating apc matches location');
                const response = await APCService.matchesAPCLocation(
                    apiClient,
                    coords
                );
                if (!response.verificationResult) {
                    handleModalToggle(
                        'Blocking anti-hacking rule: GPS coordinates hacking attempted',
                        'A possible hacking has been detected. The device GPS location does not match the device’s actual location provided by the network carrier. The application’s flow must stop.'
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



        setLoading(false);
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

        APCService.getAPCLocation(apiClient)
            .then(setAPCPosition)
            .catch(console.error);

        const firstCountry = cities
            .map((item) => item.country)
            .filter((value, index, self) => self.indexOf(value) === index)[0];

        handleCountryChange(firstCountry);
    }, []);

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
                        <Controller
                            name="Country"
                            control={control}
                            // rules={{
                            //   required: 'This field is required',
                            //   pattern: {
                            //     value: /^[a-zA-Z ]*$/,
                            //     message: 'No numbers allowed',
                            //   },
                            //   validate: {
                            //     startsWithCapital: (value: string) => {
                            //       const otherValue = getValues('StateProvince'); // we can check other field values
                            //       return value.charAt(0) === value.charAt(0).toUpperCase() || 'City must start with a capital letter';
                            //     }
                            //   },
                            // }}
                            render={({ field }) => (
                                <RNPickerSelect
                                    style={pickerStyle}
                                    darkTheme={true}
                                    value={field.value}
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
                                    items={cities
                                        .map((item) => item.country)
                                        .filter(
                                            (value, index, self) =>
                                                self.indexOf(value) === index
                                        )
                                        .sort((a, b) =>
                                            a.localeCompare(b, 'es', {
                                                sensitivity: 'base',
                                            })
                                        )
                                        .map((item) => {
                                            return {
                                                label: item,
                                                value: item,
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

                        <Controller
                            name="StateProvince"
                            control={control}
                            render={({ field }) => (
                                <RNPickerSelect
                                    style={pickerStyle}
                                    darkTheme={true}
                                    value={field.value}
                                    disabled={!getValues('Country')}
                                    onValueChange={handleStateChange}
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
                                    items={cities
                                        .filter(
                                            (item) =>
                                                item.country ===
                                                getValues('Country')
                                        )
                                        .map((item) => item.state)
                                        .filter(
                                            (value, index, self) =>
                                                self.indexOf(value) === index
                                        )
                                        .sort((a, b) =>
                                            a.localeCompare(b, 'es', {
                                                sensitivity: 'base',
                                            })
                                        )
                                        .map((item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        })}
                                />
                            )}
                        />
                        {errors.StateProvince && (
                            <StyledText color="danger200">
                                {errors.StateProvince.message}
                            </StyledText>
                        )}

                        <Controller
                            name="City"
                            control={control}
                            render={({ field }) => (
                                <RNPickerSelect
                                    style={pickerStyle}
                                    darkTheme={true}
                                    value={field.value}
                                    disabled={!getValues('StateProvince')}
                                    onValueChange={handleCityChange}
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
                                    items={cities
                                        .filter(
                                            (item) =>
                                                item.country ==
                                                getValues('Country') &&
                                                item.state ===
                                                getValues('StateProvince')
                                        )
                                        .map((item) => item.city)
                                        .filter(
                                            (value, index, self) =>
                                                self.indexOf(value) === index
                                        )
                                        .sort((a, b) =>
                                            a.localeCompare(b, 'es', {
                                                sensitivity: 'base',
                                            })
                                        )
                                        .map((item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        })}
                                />
                            )}
                        />
                        {errors.City && (
                            <StyledText color="danger200">
                                {errors.City.message}
                            </StyledText>
                        )}

                        {!config?.skipGeolocationCheck && (
                            <View style={styles.btnGroup}>
                                <StyledText style={styles.comparisonTitle}>
                                    Internal comparison with:
                                </StyledText>
                                <Controller
                                    control={control}
                                    name="GPSOption"
                                    rules={{
                                        required: 'Please select an option',
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <RadioButton.Group
                                            onValueChange={onChange}
                                            value={value}
                                        >
                                            <View>
                                                <View>
                                                    <Pressable
                                                        onPress={() =>
                                                            onChange('true')
                                                        }
                                                    >
                                                        <View
                                                            style={styles.flex}
                                                        >
                                                            <RadioButton.Android
                                                                value="true"
                                                                color={
                                                                    Colors.accent200
                                                                }
                                                            />
                                                            <StyledText>
                                                                Device GPS
                                                            </StyledText>
                                                        </View>
                                                        <View
                                                            style={
                                                                styles.optionSubtitleContainer
                                                            }
                                                        >
                                                            {gpsPosition &&
                                                                gpsPosition.location ? (
                                                                <View
                                                                    style={
                                                                        styles.optionSubtitleBadge
                                                                    }
                                                                >
                                                                    <StyledText>
                                                                        {
                                                                            gpsPosition
                                                                                .location
                                                                                .country
                                                                        }{' '}
                                                                        -{' '}
                                                                        {
                                                                            gpsPosition
                                                                                .location
                                                                                .state
                                                                        }{' '}
                                                                        -{' '}
                                                                        {
                                                                            gpsPosition
                                                                                .location
                                                                                .city
                                                                        }
                                                                    </StyledText>
                                                                </View>
                                                            ) : null}
                                                            {gpsPosition &&
                                                                gpsPosition.coords ? (
                                                                <View
                                                                    style={
                                                                        styles.optionSubtitleBadge
                                                                    }
                                                                >
                                                                    <StyledText>
                                                                        {gpsPosition.coords.latitude.toFixed(
                                                                            4
                                                                        )}
                                                                        ,{' '}
                                                                        {gpsPosition.coords.longitude.toFixed(
                                                                            4
                                                                        )}
                                                                    </StyledText>
                                                                </View>
                                                            ) : null}
                                                        </View>
                                                    </Pressable>
                                                </View>
                                            </View>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        onChange('hacked')
                                                    }
                                                >
                                                    <View style={styles.flex}>
                                                        <RadioButton.Android
                                                            value="hacked"
                                                            color={
                                                                Colors.accent200
                                                            }
                                                        />
                                                        <StyledText>
                                                            Hacked GPS
                                                        </StyledText>
                                                    </View>
                                                    {getValues('Country') &&
                                                        getValues(
                                                            'StateProvince'
                                                        ) &&
                                                        getValues('City') ? (
                                                        <View
                                                            style={
                                                                styles.optionSubtitleContainer
                                                            }
                                                        >
                                                            {config?.connectionMode !=
                                                                ConnectionMode.Offline ? (
                                                                <View
                                                                    style={[
                                                                        styles.optionSubtitleBadge,
                                                                    ]}
                                                                >
                                                                    <StyledText>
                                                                        {getValues(
                                                                            'Country'
                                                                        )}{' '}
                                                                        -{' '}
                                                                        {getValues(
                                                                            'StateProvince'
                                                                        )}{' '}
                                                                        -{' '}
                                                                        {getValues(
                                                                            'City'
                                                                        )}
                                                                    </StyledText>
                                                                </View>
                                                            ) : null}
                                                            <View
                                                                style={
                                                                    styles.optionSubtitleBadge
                                                                }
                                                            >
                                                                <StyledText>
                                                                    {
                                                                        hackedGPS?.latitude
                                                                    }
                                                                    ,{' '}
                                                                    {
                                                                        hackedGPS?.longitude
                                                                    }
                                                                </StyledText>
                                                            </View>
                                                        </View>
                                                    ) : null}
                                                </Pressable>
                                            </View>
                                            <View
                                                style={[
                                                    styles.dangerSeparator,
                                                    customStyles.my5,
                                                ]}
                                            ></View>
                                            <View>
                                                <Controller
                                                    control={control}
                                                    name="UseAPC"
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                        },
                                                    }) => (
                                                        <Pressable
                                                            onPress={() =>
                                                                onChange(!value)
                                                            }
                                                        >
                                                            <View
                                                                style={
                                                                    styles.flex
                                                                }
                                                            >
                                                                <CheckboxWithText
                                                                    label="Use Azure Programmable Connectivity backend"
                                                                    checked={
                                                                        value
                                                                    }
                                                                    onToggle={() =>
                                                                        onChange(
                                                                            !value
                                                                        )
                                                                    }
                                                                />
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.optionSubtitleContainer
                                                                }
                                                            >
                                                                {apcPosition &&
                                                                    apcPosition.location ? (
                                                                    <View
                                                                        style={
                                                                            styles.optionSubtitleBadge
                                                                        }
                                                                    >
                                                                        <StyledText>
                                                                            {
                                                                                apcPosition
                                                                                    .location
                                                                                    .country
                                                                            }{' '}
                                                                            -{' '}
                                                                            {
                                                                                apcPosition
                                                                                    .location
                                                                                    .state
                                                                            }{' '}
                                                                            -{' '}
                                                                            {
                                                                                apcPosition
                                                                                    .location
                                                                                    .city
                                                                            }
                                                                        </StyledText>
                                                                    </View>
                                                                ) : null}
                                                                {apcPosition &&
                                                                    apcPosition.coords ? (
                                                                    <View
                                                                        style={
                                                                            styles.optionSubtitleBadge
                                                                        }
                                                                    >
                                                                        <StyledText>
                                                                            {
                                                                                apcPosition
                                                                                    .coords
                                                                                    .latitude
                                                                            }
                                                                            ,{' '}
                                                                            {
                                                                                apcPosition
                                                                                    .coords
                                                                                    .longitude
                                                                            }
                                                                        </StyledText>
                                                                    </View>
                                                                ) : null}
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
        width: ' 100%',
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
        backgroundColor: Colors.secondary200,
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
        color: palette.accent300,
    },
    iconPicker: {
        paddingTop: 12,
    },
});

const pickerStyle: PickerStyle = {
    inputWeb: {
        fontSize: 20,
        padding: 10,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: palette.accent200,
    },
    inputIOS: {
        fontSize: 20,
        padding: 10,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: palette.accent200,
    },
    inputAndroid: {
        fontSize: 20,
        padding: 10,
        backgroundColor: palette.transparent,
        color: palette.neutral,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: palette.accent200,
    },
};

export default ResidenceLocation;

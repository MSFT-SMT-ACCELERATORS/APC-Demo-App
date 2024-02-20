import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as APCService from '../utils/APCService';

import Button from '../components/Button';
import StyledText from '../components/StyledText';
import StyledInputText from '../components/StyledInputText';
import palette from '../themes/Colors';
import Slider from '../components/Slider';
import AppContainer from '../components/AppContainer';
import customStyles from '../themes/CustomStyles';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import { Modal } from 'react-native-paper';
import { useStep } from '../utils/StepContext';
import { useApiClient } from '../api/ApiClientProvider';
import CustomModal from '../components/CustomModal';
import { AppConfiguration, ConnectionMode, readConfigurations } from '../utils/SettingsService';

interface StepProps {
  setProgress: (progress: number) => void;
  setLoading: (isLoading: boolean) => void;
}

enum ButtonNames {
  consolidation,
  bills,
  moving,
  others,
}

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 200;

const StarterPage: React.FC<StepProps> = ({ setProgress, setLoading }) => {
  const navigation = useNavigation();
  const apiClient = useApiClient();
  const { setCurrentStep } = useStep();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] =
    useState<boolean>(false);
  const [config, setConfig] = useState<AppConfiguration>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [showModalIcon, setModalIcon] = useState(true);
  const [modalIconName, setIcon] = useState('');
  const [modalIconColor, setColorIcon] = useState('');
  const [modalBackground, setModalBackground] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleModalToggle = (title: string, text: string, backgroundColor: string = palette.danger100, showIcon: boolean = true, iconName: string = 'warning-outline', iconColor: string = palette.danger200) => {
    setModalVisible(!modalVisible);
    setModalIcon(showIcon);
    setModalBackground(backgroundColor);
    setModalTitle(title);
    setModalText(text);
    setIcon(iconName);
    setColorIcon(iconColor);
  };


  const onFormValid = async (data: FieldValues) => {
    console.log(data);
    setLoading(true, "Validating your data...");
    
    // APC validation
    const response = await APCService.checkSimChange(apiClient);
    console.log("SIMSWAP: ", response);

    if (response) {
      console.log("SIM swap detected");
      handleModalToggle("SIM swap detected", "A recent SIM change has been detected on this device, for security reasons you cannot continue with this local request");

    } else {
      console.log("SIM swap not detected");
      handleModalToggle("SIM swap not detected", "For security reasons we checked that your phone line didn’t have any SIM swap recently. You can continue with this loan request.", palette.accent200, true, 'information-circle-outline', palette.black);
      setShouldNavigate(true);
    }

    setLoading(false);

  }

  useEffect(() => {
    if (!modalVisible && shouldNavigate) {
      setTimeout(() => {
        navigation.navigate('Information');
        setShouldNavigate(false);
      }, 100);
    }
  }, [modalVisible, shouldNavigate, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
      setProgress(50);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  useEffect(() => {
    readConfigurations().then(setConfig);
  }, [])

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  const buttonStyleVariant = (
    buttonElement: 'title' | 'icon',
    isSelected: boolean
  ) => {
    switch (buttonElement) {
      case 'title':
        return isSelected ? 'primary300' : 'accent200';

      case 'icon':
        return isSelected ? palette.primary300 : palette.accent200;
    }
  };

  const autocompletePhoneNumber = async () => {

    if (config?.connectionMode === ConnectionMode.Offline && config.autovalidatePhoneNumber) {
      setIsPhoneNumberValid(true);
      handleModalToggle("Information message", "Congratulations, for anti-fraud reasons, the provided telephone number has been verified by your carrier that coincides with the phone line you are using", palette.accent200, undefined, 'information-circle-outline', palette.black);
      return;
    }

    const devicePhoneNumber = await APCService.getPhoneNumber(apiClient);

    if (!phoneNumber) {
      setPhoneNumber(devicePhoneNumber);
      handleModalToggle("Information message:", "Congratulations, for anti-fraud reasons, we were able to obtain your telephone number directly from your operator telco company so you don't need to write it. Not that you can only request this loan if providing a phone number that is currently being used with the phone, for tracking and security purposes.", palette.accent200, undefined, 'information-circle-outline', palette.black);
      setIsPhoneNumberValid(true);
    } else {
      if (phoneNumber === devicePhoneNumber) {
        setIsPhoneNumberValid(true);
        handleModalToggle("Information message:", "Congratulations, for anti-fraud reasons, the provided telephone number has been verified by your carrier that coincides with the phone line you are using", palette.accent200, undefined, 'information-circle-outline', palette.black);
      } else {
        setIsPhoneNumberValid(false);
        handleModalToggle("Error message:", "Invalid phone number");
      }
    }
  };

  return (
    <AppContainer>
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>
          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>
              Let’s get started
            </StyledText>
            <StyledText
              style={{ textAlign: 'center' }}
              customStyle={['title5', 'regular']}
            >
              Please complete the form below {'  '}
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
              name="phonenumber"
              control={control}
              render={() => (
                <View style={styles.phoneNumberField}>
                <StyledText style={styles.plusIcon}>+</StyledText>
                  <StyledInputText
                    style={styles.phoneInput}
                    labelText="Phone number (Include country code)"
                    placeholder="00 123 456 7890"
                    value={phoneNumber}
                    inputType="tel"
                    onChangeText={(text) =>
                      setPhoneNumber(text)
                    }
                  ></StyledInputText>
                  <TouchableOpacity>
                    <Button
                      title=""
                      size="short"
                      style={
                        styles.phoneVerificationCheck
                      }
                      showIcon={true}
                      iconName={'check'}
                      iconColor={palette.primary300}
                      useGradient={true}
                      onPress={autocompletePhoneNumber}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            <StyledText customStyle={['standar']}>
              I would like to formally request a loan for the
              following amount:
            </StyledText>

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Slider
                  minValue={500}
                  maxValue={10000}
                  stepSize={100}
                  formatter={currencyFormatter}
                  onChange={field.onChange}
                  value={field.value}
                  style={{ padding: 10 }}
                />
              )}
            />
            <StyledText customStyle={['standar']}>
              Purpose:
            </StyledText>

            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <View>
                  <View style={styles.row}>
                    <Button
                      title="Debt consolidation"
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant(
                        'title',
                        field.value ===
                        ButtonNames.consolidation
                      )}
                      style={[
                        customStyles.my3,
                        customStyles.mr1,
                        isSmallScreen
                          ? styles.largeIconButton
                          : styles.smallIconButton,
                      ]}
                      size="square"
                      showIcon={true}
                      outline={true}
                      iconLib="MaterialIcons"
                      iconName={'attach-money'}
                      iconSize={50}
                      iconColor={buttonStyleVariant(
                        'icon',
                        field.value ===
                        ButtonNames.consolidation
                      )}
                      onPress={() =>
                        field.onChange(
                          ButtonNames.consolidation
                        )
                      }
                      isActive={
                        field.value ===
                        ButtonNames.consolidation
                      }
                    />
                    <Button
                      title="Monthly bills"
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant(
                        'title',
                        field.value ===
                        ButtonNames.bills
                      )}
                      style={[
                        customStyles.my2,
                        isSmallScreen
                          ? styles.largeIconButton
                          : styles.smallIconButton,
                      ]}
                      size="square"
                      showIcon={true}
                      outline={true}
                      iconLib="Ionicons"
                      iconName={'calendar-outline'}
                      iconSize={50}
                      iconColor={buttonStyleVariant(
                        'icon',
                        field.value ===
                        ButtonNames.bills
                      )}
                      onPress={() =>
                        field.onChange(
                          ButtonNames.bills
                        )
                      }
                      isActive={
                        field.value ===
                        ButtonNames.bills
                      }
                    />
                  </View>
                  <View style={styles.row}>
                    <Button
                      title="Moving"
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant(
                        'title',
                        field.value ===
                        ButtonNames.moving
                      )}
                      style={[
                        customStyles.my3,
                        customStyles.mr1,
                        isSmallScreen
                          ? styles.largeIconButton
                          : styles.smallIconButton,
                      ]}
                      size="square"
                      showIcon={true}
                      outline={true}
                      iconLib="MaterialCommunity"
                      iconName={'truck-check-outline'}
                      iconSize={45}
                      iconColor={buttonStyleVariant(
                        'icon',
                        field.value ===
                        ButtonNames.moving
                      )}
                      onPress={() =>
                        field.onChange(
                          ButtonNames.moving
                        )
                      }
                      isActive={
                        field.value ===
                        ButtonNames.moving
                      }
                    />
                    <Button
                      title="Others"
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant(
                        'title',
                        field.value ===
                        ButtonNames.others
                      )}
                      style={[
                        customStyles.my3,
                        isSmallScreen
                          ? styles.largeIconButton
                          : styles.smallIconButton,
                      ]}
                      size="square"
                      showIcon={true}
                      outline={true}
                      iconLib="Ionicons"
                      iconName={'wallet-outline'}
                      iconSize={50}
                      iconColor={buttonStyleVariant(
                        'icon',
                        field.value ===
                        ButtonNames.others
                      )}
                      onPress={() =>
                        field.onChange(
                          ButtonNames.others
                        )
                      }
                      isActive={
                        field.value ===
                        ButtonNames.others
                      }
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            title="Next"
            style={[styles.button]}
            size="long"
            useGradient={true}
            onPress={handleSubmit(onFormValid)}
            disabled={!isPhoneNumberValid}
          />
        </View>
      </View>
      <Modal
        visible={tooltipVisible}
        onDismiss={hideTooltip}
        contentContainerStyle={styles.tooltip}
      >
        <StyledText customStyle={['standarSm', 'bold']} color="black">
          Note that the provided contact phone number should match the
          line number of the current phone using the app.
        </StyledText>
      </Modal>

      
      <CustomModal
        visible={modalVisible}
        onClose={() => handleModalToggle('', '', '', false,'','')}
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

const currencyFormatter = (value: number) => {
  return (
    '$' +
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value)
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
    // marginBottom:'33%'
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
  tooltip: {
    position: 'absolute',
    top: 50,
    color: '#000',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: palette.neutral,
  },
  phoneNumberField: {
    justifyContent: 'space-between',
  },
  phoneInput: {
    marginRight: 50,
  },
  phoneVerificationCheck: {
    width: 50,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    bottom: 6,
  },
  plusIcon: {
    position: 'absolute',
    left: 5,
    bottom: 25
  }
});

export default StarterPage;

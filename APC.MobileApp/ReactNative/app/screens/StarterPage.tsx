import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button'
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


interface StepProps {
  setProgress: (progress: number) => void;
  setLoading: (isLoading: boolean) => void;
}

enum ButtonNames {
  consolidation,
  bills,
  moving,
  others
}

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 200;

const StarterPage: React.FC<StepProps> = ({ setProgress, setLoading }) => {
  const navigation = useNavigation();
  const { setCurrentStep } = useStep();
  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

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

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  const buttonStyleVariant = (buttonElement: 'title' | 'icon', isSelected: boolean) => {
    switch (buttonElement) {
      case "title":
        return isSelected ? 'primary300' : 'accent200'

      case "icon":
        return isSelected ? palette.primary300 : palette.accent200
    }
  }


  const onFormValid = async (data: FieldValues) => {
    console.log(data);
    navigation.navigate('Information');
  }

  return (
    <AppContainer>
      <View style={[styles.parent]}>
        <ScrollView style={[styles.contentContainer]}>

          <View style={[styles.title]}>
            <StyledText customStyle={['title2', 'extrabold']}>Let’s get started</StyledText>
            <StyledText style={{ textAlign: 'center' }} customStyle={['title5', 'regular']}>Please complete the form below {'  '}
              <Icon name="infocirlceo" size={20} color={palette.accent200} onPress={showTooltip} />
            </StyledText>
          </View>

          <View style={[styles.separatorContainer, customStyles.mb4]}></View>
          <View style={styles.bodyContent}>

            <Controller
              name='phonenumber'
              control={control}
              render={({ field }) => (
                <StyledInputText labelText="Phone Number" placeholder="+1 365-478-8429" inputType='tel' onChangeText={field.onChange}></StyledInputText>
              )} />
            <StyledText customStyle={['standar']}>I would like to formally request a loan for the following amount:</StyledText>

            <Controller
              name='amount'
              control={control}
              render={({ field }) => (
                <Slider minValue={500} maxValue={10000} stepSize={100} formatter={currencyFormatter} onChange={field.onChange} value={field.value} style={{ padding: 10 }} />
              )} />
            <StyledText customStyle={['standar']}>Purpose:</StyledText>

            <Controller
              name='purpose'
              control={control}
              render={({ field }) => (
                <View>
                  <View style={styles.row}>
                    <Button
                      title='Debt Consolidation'
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant('title', field.value === ButtonNames.consolidation)}
                      style={[customStyles.my3, customStyles.mr1, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
                      size='square'
                      showIcon={true}
                      outline={true}
                      iconLib='MaterialIcons'
                      iconName={'attach-money'}
                      iconSize={50}
                      iconColor={buttonStyleVariant('icon', field.value === ButtonNames.consolidation)}
                      onPress={() => field.onChange(ButtonNames.consolidation)}
                      isActive={field.value === ButtonNames.consolidation}
                    />
                    <Button
                      title='Monthly Bills'
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant('title', field.value === ButtonNames.bills)}
                      style={[customStyles.my2, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
                      size='square'
                      showIcon={true}
                      outline={true}
                      iconLib='Ionicons'
                      iconName={'calendar-outline'}
                      iconSize={50}
                      iconColor={buttonStyleVariant('icon', field.value === ButtonNames.bills)}
                      onPress={() => field.onChange(ButtonNames.bills)}
                      isActive={field.value === ButtonNames.bills}
                    />
                  </View>
                  <View style={styles.row}>
                    <Button
                      title='Moving'
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant('title', field.value === ButtonNames.moving)}
                      style={[customStyles.my3, customStyles.mr1, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
                      size='square'
                      showIcon={true}
                      outline={true}
                      iconLib='MaterialCommunity'
                      iconName={'truck-check-outline'}
                      iconSize={45}
                      iconColor={buttonStyleVariant('icon', field.value === ButtonNames.moving)}
                      onPress={() => field.onChange(ButtonNames.moving)}
                      isActive={field.value === ButtonNames.moving}
                    />
                    <Button
                      title='Others'
                      titleSize={customStyles.small}
                      titleColor={buttonStyleVariant('title', field.value === ButtonNames.others)}
                      style={[customStyles.my3, isSmallScreen ? styles.largeIconButton : styles.smallIconButton]}
                      size='square'
                      showIcon={true}
                      outline={true}
                      iconLib='Ionicons'
                      iconName={'wallet-outline'}
                      iconSize={50}
                      iconColor={buttonStyleVariant('icon', field.value === ButtonNames.others)}
                      onPress={() => field.onChange(ButtonNames.others)}
                      isActive={field.value === ButtonNames.others}
                    />
                  </View>
                </View>
              )} />
          </View>
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            title="Next"
            style={[styles.button]}
            size='long'
            useGradient={true}
            onPress={handleSubmit(onFormValid)} />
        </View>

      </View>
      <Modal visible={tooltipVisible} onDismiss={hideTooltip} contentContainerStyle={styles.tooltip}>
        <StyledText customStyle={['standarSm', 'bold']} color='black'>Note that your phone should be the same number used by your phone</StyledText>
      </Modal>
    </AppContainer>
  );
}

const currencyFormatter = (value: number) => {
  return "$" + new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

const styles = StyleSheet.create({
  parent: {
    width: ' 100%',
    flex: 1,
    backgroundColor: palette.primary300
  },
  title: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    gap: 10
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingTop: 0,
    marginBottom: 120
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
    marginBottom: 10
  },
  footer: {
    width: '100%',
    height: undefined
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
    borderBlockColor: palette.primary100
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallIconButton: {
    flex: .5
  },
  largeIconButton: {
    flex: 1
  },
  tooltip: {
    position: 'absolute',
    top: 50,
    color: '#000',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: palette.neutral,
  }
});

export default StarterPage;

import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, GestureResponderEvent, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { APCApi, Configuration } from '../api/generated';
import Colors from '../themes/Colors';
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar';
import palette from '../themes/Colors';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useState } from 'react';
import textStyles from '../themes/Texts';
import { useApiClient } from '../api/ApiClientProvider';
import AppContainer from '../components/AppContainer';
import CheckboxWithText from '../components/CheckBox';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResidenceLocation from './ResidenceLocation';
import StarterPage from './StarterPage';
import Information from './Information';

const Stack = createNativeStackNavigator();

function Steps() {
    const navigation = useNavigation();
    const apiClient = useApiClient();
    const [value, setValue] = useState('hacked');
    const [useAPC, setUseAPC] = useState(true);
    const [progress, setProgress] = useState(0);
    const StepStack = createNativeStackNavigator();
    return (
        <AppContainer>
            <ProgressBar progress={progress} height={20} style={{margin: 20}}/>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ResidenceLocation'>
                <Stack.Screen
                    name="ResidenceLocation"
                    children={() => <ResidenceLocation setProgress={setProgress} />}
                />
                <Stack.Screen
                    name="StarterPage"
                    children={() => <StarterPage setProgress={setProgress} />}
                />
                <Stack.Screen
                    name="Information"
                    children={() => <Information setProgress={setProgress} />}
                />
            </Stack.Navigator>
        </AppContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1,
        backgroundColor: Colors.primary300,
        // justifyContent: 'flex-start',
        gap: 5,
        padding: 15
    },
    imageContainer: {
        width: '100%',
        height: 90
    },
    image: {
        width: '100%',
        height: '100%'
    },
    button: {
        marginTop: 30,
        alignSelf: 'flex-end',
        width: '100%'
    },
    separatorContainer: {
        // flex: 1,
        width: '100%',
        paddingHorizontal: 30,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.primary100
    },
    btnContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: palette.secondary200,
        backgroundColor: palette.secondary100,
        padding: 15,
        marginHorizontal: 10,

    },
    comparisonTitle: {
        textAlign: 'center',
        marginBottom: 10
    },
    option: {
        flexDirection: 'row',
        marginVertical: 10
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
        borderRadius: 10
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default Steps;
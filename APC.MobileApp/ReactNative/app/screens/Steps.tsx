import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, GestureResponderEvent, Modal } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import palette from '../themes/Colors';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResidenceLocation from './ResidenceLocation';
import StarterPage from './StarterPage';
import Information from './Information';
import { useStep } from '../utils/StepContext';
import { useNavigation } from '@react-navigation/native';

interface StepsProps {
    setLoading: (isLoading: boolean, text?: string) => void;
}

const Steps: React.FC<StepsProps> = ({ setLoading }) => {
    const Stack = createNativeStackNavigator();
    const [progress, setProgress] = useState(0);
    const { setCurrentScreen, currentStep } = useStep();

    useEffect(() => {
        setCurrentScreen('Steps');
    }, [setCurrentScreen]);

    const navigation = useNavigation();

    useEffect(() => {
        switch (currentStep) {
            case 1:
                navigation.navigate('StarterPage');
                break;
                case 2:
                navigation.navigate('ResidenceLocation');
                break;
            case 3:
                navigation.navigate('Information');
                break;
            default:
                navigation.navigate('StarterPage');
                break;
        }
    }, [currentStep, navigation]);

    return (
        <View style={[styles.container]}>
            <ProgressBar progress={progress} height={20} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="StarterPage"
                    children={() => <StarterPage setProgress={setProgress} setLoading={setLoading} />}
                />
                <Stack.Screen
                    name="ResidenceLocation"
                    children={() => <ResidenceLocation setProgress={setProgress} setLoading={setLoading} />}
                />
                <Stack.Screen
                    children={() => <Information setProgress={setProgress} setLoading={setLoading} />}
                    name="Information"
                />
            </Stack.Navigator>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary300,
    },
});

export default Steps;

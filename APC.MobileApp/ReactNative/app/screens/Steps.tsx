import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, GestureResponderEvent, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../themes/Colors';
import ProgressBar from '../components/ProgressBar';
import palette from '../themes/Colors';
import { useState } from 'react';
import { useApiClient } from '../api/ApiClientProvider';
import AppContainer from '../components/AppContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResidenceLocation from './ResidenceLocation';
import StarterPage from './StarterPage';
import Information from './Information';
import customStyles from '../themes/CustomStyles';

const Stack = createNativeStackNavigator();

function Steps() {
    const navigation = useNavigation();
    const apiClient = useApiClient();
    const [value, setValue] = useState('hacked');
    const [useAPC, setUseAPC] = useState(true);
    const [progress, setProgress] = useState(0);
    const StepStack = createNativeStackNavigator();
    return (
        <View style={[styles.container]}>
            <ProgressBar progress={progress} height={20} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="ResidenceLocation"
                    children={() => <ResidenceLocation setProgress={setProgress} />}
                    />
                <Stack.Screen
                    name="StarterPage"
                    children={() => <StarterPage setProgress={setProgress} />}
                    />
                    <Stack.Screen
                    children={() => <Information setProgress={setProgress} />}
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

import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Colors from '../themes/Colors';
import Button from '../components/Button'

import palette from '../themes/Colors';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useState } from 'react';
import textStyles from '../themes/Texts';
import Checkbox from '../components/CheckBox';


function Demo() {
    const navigation = useNavigation();
    const [value, setValue] = useState('hacked');

    return (
        <ScrollView style={styles.container}>
            <View>
                <Checkbox label={'Offline Mode'} />
                <Checkbox label={'APC Mock mode'} />
                <Button
                    title="Back"
                    style={styles.button}
                    onPress={() => navigation.navigate('Welcome')}
                />
            </View>
        </ScrollView>
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
    button: {
        marginTop: 30,
        alignSelf: 'flex-end',
        width: '100%'
    }
});

export default Demo;
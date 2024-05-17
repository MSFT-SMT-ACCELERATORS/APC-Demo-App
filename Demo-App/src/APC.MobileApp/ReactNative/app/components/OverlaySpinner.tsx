import React from 'react';
import {StyleSheet, StyleProp, TextStyle, View, ActivityIndicator } from 'react-native';

import StyledText from './StyledText';


interface OverlaySpinnerProps {
    text?: string;
    textStyle?: StyleProp<TextStyle>
}

const OverlaySpinner: React.FC<OverlaySpinnerProps> = ({ text, textStyle }) => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            {text && <StyledText>{text}</StyledText>}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    text: {
        marginTop: 20,
        color: '#fff',
    },
});


export default OverlaySpinner
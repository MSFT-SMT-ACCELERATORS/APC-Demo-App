import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, TextStyle, ViewStyle, View, ImageSourcePropType, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import btnStyles from '../themes/BtnStyles';
import StyledText from './StyledText';
import palette from '../themes/Colors';
import customStyles from '../themes/CustomStyles';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        position: 'absolute', // Posiciona el overlay sobre otros componentes
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Color de fondo negro con opacidad
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Asegura que el overlay esté por encima de otros componentes
    },
    text: {
        marginTop: 20,
        color: '#fff', // Texto blanco para contraste
    },
});


export default OverlaySpinner
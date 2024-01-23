import React, { ReactNode } from 'react';
import { View, StyleSheet, StatusBar, ViewStyle, TextInput, TextInputProps } from 'react-native';
import palette from "../themes/Colors";
import StyledText from './StyledText';
import customStyles from '../themes/CustomStyles';

interface InputTextProps {
    style?: ViewStyle;
    customStyle?: Array<keyof typeof customStyles>;
    colors?: keyof typeof palette;
    labelText?: string;
    placeholder?: string;
}

const styles = StyleSheet.create({
    input_properties: {
        flexGrow: 1,
        backgroundColor: palette.transparent,
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: palette.accent200,
        color: palette.neutral,
    },
});

const StyledInputText: React.FC<InputTextProps & TextInputProps> = ({
    style,
    labelText,
    placeholder,
    placeholderTextColor = palette.placeholder,
    children,
    ...textInputProps
}) => {
    return (
        <View style={customStyles.m3}>
            <StyledText customStyle={['bold']}>{labelText}</StyledText>
            <TextInput
                style={[styles.input_properties, style]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                {...textInputProps}
            />
        </View>
    );
};
export default StyledInputText;
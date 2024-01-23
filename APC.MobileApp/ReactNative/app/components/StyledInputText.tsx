import React, { forwardRef } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import palette from "../themes/Colors";
import StyledText from './StyledText';

interface InputTextProps extends TextInputProps {
    style?: ViewStyle;
    colors?: keyof typeof palette;
    labelText?: string;
    placeholder?: string;
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
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

const StyledInputText = forwardRef<TextInput, InputTextProps>(
    ({ style, labelText, placeholder, placeholderTextColor = palette.placeholder, ...textInputProps }, ref) => {
      return (
        <View style={styles.container}>
          <StyledText textStyle='bold'>{labelText}</StyledText>
          <TextInput
            style={[styles.input_properties, style]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            ref={ref}
            {...textInputProps} // Esto pasará todas las props adicionales, incluyendo value, onChangeText (que es el equivalente de onChange en React Native), y onBlur
          />
        </View>
      );
    }
);

export default StyledInputText;

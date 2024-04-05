import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, ViewStyle, TouchableOpacity } from 'react-native';
import palette from "../themes/Colors";
import StyledText from './StyledText';
import customStyles from '../themes/CustomStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputTextProps extends TextInputProps {
    style?: ViewStyle;
    customStyle?: Array<keyof typeof customStyles>;
    colors?: keyof typeof palette;
    labelText?: string;
    placeholder?: string;
    inputType?: 'text' | 'numeric' | 'decimal' | 'tel';
    isSensitiveData?: boolean;
}

const styles = StyleSheet.create({
    input_properties: {
        flexGrow: 1,
        fontSize: 18,
        backgroundColor: palette.transparent,
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: palette.accent200,
        color: palette.neutral,
    },

    input_invalid: {
        borderBottomColor: palette.danger200,
    },

    input_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        position: 'absolute',
        right: 0,
    },
});

const StyledInputText = forwardRef<TextInput, InputTextProps>(({
    style,
    labelText,
    placeholder,
    placeholderTextColor = palette.placeholder,
    inputType = 'text',
    isSensitiveData = false,
    children,
    ...textInputProps
}, ref) => {
    const initialState = {
        value: '',
        icon: 'check',
        isIconVisible: false,
        iconColor: '',
        isPasswordVisible: false,
        isValid: true,
    }

    const [inputState, setInputState] = useState(initialState);

    const iconVariants = {
        valid: { name: 'check', color: palette.accent200 },
        invalid: { name: 'remove', color: palette.danger200 },
        passwordVisible: 'eye-slash',
        passwordNotVisible: 'eye',
    };

    const checkInputValue = () => {
        const trimmedValue = inputState.value.trim();

        if (trimmedValue.length === 0) {
            setInputState({
                ...inputState,
                isValid: true,
                isIconVisible: false,
            });

            return;
        }

        if (inputType === 'numeric' || inputType === 'tel') {
            const hasLetters = /[a-zA-Z]/.test(inputState.value);
            const iconVariant = hasLetters ? iconVariants.invalid : iconVariants.valid;

            setInputState({
                ...inputState,
                icon: iconVariant.name,
                iconColor: iconVariant.color,
                isIconVisible: true,
                isValid: !hasLetters,
            });

            return;
        }

        setInputState({
            ...inputState,
            iconColor: palette.accent200,
            isIconVisible: true,
            isValid: true,
        });
    }

    const togglePasswordVisibility = () => setInputState({ ...inputState, isPasswordVisible: !inputState.isPasswordVisible })

    return (
        <View style={customStyles.m3}>
            <StyledText customStyle={['bold']}>{labelText}</StyledText>
            <View style={styles.input_wrapper}>
                <TextInput
                    inputMode={inputType}
                    onBlur={checkInputValue}
                    onChangeText={(value) => {
                        setInputState({ ...inputState, value });
                        textInputProps.onChangeText && textInputProps.onChangeText(value);
                    }}
                    style={[styles.input_properties, style, !inputState.isValid && styles.input_invalid]}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={isSensitiveData ? !inputState.isPasswordVisible : false}
                    ref={ref}
                    {...textInputProps}
                />
                {isSensitiveData && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                        <Icon name={inputState.isPasswordVisible ? iconVariants.passwordVisible : iconVariants.passwordNotVisible} size={20} color={palette.neutral} />
                    </TouchableOpacity>
                )}

                {!isSensitiveData && inputState.isIconVisible && (
                    <Icon name={inputState.icon} size={20} color={inputState.iconColor} style={styles.icon} />
                )}
            </View>
        </View>
    );
}
);

export default StyledInputText;

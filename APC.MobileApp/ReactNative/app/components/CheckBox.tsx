import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import palette from '../themes/Colors';
import StyledText from './StyledText';

interface CheckboxWithTextProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  styles?: {
    container?: object;
    checkbox?: object;
    checked?: object;
    text?: object;
  };
}

const defaultStyles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  checkbox: {
    marginTop: 5,
    height: 25,
    width: 25,
    backgroundColor: palette.accent200,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  checked: {
    backgroundColor: palette.accent200,
  },
  text: {
    color: palette.neutral,
    flex: 1,
    textAlign: 'justify',
  },
});


const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({ label, checked, onToggle, styles = {} }) => {
  return (
    <TouchableOpacity style={defaultStyles.flex} onPress={onToggle}>
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={onToggle} // Esta llamada es opcional si el TouchableOpacity ya maneja el toggle
        uncheckedColor={palette.accent200}
        color={palette.accent200}
      />
      <StyledText style={styles.text}>{label}</StyledText>
    </TouchableOpacity>
  );
};

export default CheckboxWithText;

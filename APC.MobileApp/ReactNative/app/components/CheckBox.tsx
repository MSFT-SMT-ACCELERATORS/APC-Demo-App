import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    color: '#FFF',
    flex: 1,
    textAlign: 'justify',
  },
});

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({ label, checked, onToggle, styles = {} }) => {
  return (
    <View style={defaultStyles.flex}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onToggle}
        uncheckedColor={palette.accent200} // Personaliza el color no seleccionado
        color={palette.accent200} // Personaliza el color seleccionado
      />
      <StyledText>{label}</StyledText>
    </View>
  );
};

export default CheckboxWithText;

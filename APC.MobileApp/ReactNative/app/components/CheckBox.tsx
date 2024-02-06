import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
    alignSelf: 'center',
  },
});


const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({ label, checked, onToggle, styles = {} }) => {
  return (
    <Pressable style={defaultStyles.flex} onPress={onToggle}>
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={onToggle}
        uncheckedColor={palette.accent200}
        color={palette.accent200}
      />
      <StyledText style={defaultStyles.text}>{label}</StyledText>
    </Pressable>
  );
};

export default CheckboxWithText;

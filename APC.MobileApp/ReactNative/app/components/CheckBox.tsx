import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Colors from '../themes/Colors';

interface CheckboxProps {
    text: string,
    isChecked: boolean;
    onCheck: () => void;
  }

const Checkbox: React.FC<CheckboxProps> = ({ text, isChecked, onCheck }) => {
  return (
    <TouchableOpacity onPress={onCheck} style={styles.container}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {/* Renderiza un ícono o imagen si está marcado */}
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        // padding:10
    },
  checkbox: {
    marginTop: 5,
    height: 25,
    width: 25,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5
  },
  checked: {
    backgroundColor: Colors.accent200
  },
  text: {
    color: '#FFF',
    flex: 1,
    textAlign: 'justify'
  }
});

export default Checkbox;

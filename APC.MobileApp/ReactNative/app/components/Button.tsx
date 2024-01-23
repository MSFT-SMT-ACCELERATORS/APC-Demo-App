import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    gradientColors?: string[];
  }
  
const Button: React.FC<ButtonProps> = ({ 
    title, 
    onPress, 
    style, 
    textStyle, 
    gradientColors = ['#00fdee', '#4ad896']
  }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.gradient, style]}>
      {/* <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      > */}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#4ad896'
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 10,
    color: '#000',
  },
});

export default Button;
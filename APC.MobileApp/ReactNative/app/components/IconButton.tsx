import React from 'react';
import { TouchableOpacity, Image, Text, ViewStyle, TextStyle, ImageSourcePropType, StyleSheet } from 'react-native';
import palette from '../themes/Colors';

interface CustomButtonProps {
  icon?: ImageSourcePropType;
  text?: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'image' | 'text' | 'imageAndText';
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.accent200,
      padding: 10,
      borderRadius: 8,
    },
    textButton: {
      backgroundColor: palette.primary200,
    },
    icon: {
      width: 24,
      height: 24,
      marginBottom: 8,
    },
    text: {
      color: palette.neutral,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

const CustomButton: React.FC<CustomButtonProps> = ({ icon, text, onPress, style, textStyle, type = 'imageAndText' }) => {
  const buttonStyles = [styles.button];
  const content = [];


  if (type === 'text' || type === 'imageAndText') {
    buttonStyles.push();
    content.push(<Text key="text" style={[styles.text, textStyle]}>{text}</Text>);
  }

  return (
    <TouchableOpacity style={[...buttonStyles, style]} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};



export default CustomButton;

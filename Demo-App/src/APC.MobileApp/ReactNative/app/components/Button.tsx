import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, TextStyle, ViewStyle, View, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import btnStyles from '../themes/BtnStyles';
import StyledText from './StyledText';
import palette from '../themes/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ButtonSize = 'fit' | 'short' | 'normal' | 'long' | 'square';
type IconName = 'attach-money' | 'truck-check-outline' | 'wallet-outline' | 'settings' | 'calendar-check-o';

interface ButtonProps {
  title?: string;
  titleSize?: any;
  titleColor?: any;
  onPress: (event: GestureResponderEvent) => void;
  isActive?: boolean;
  style?: StyleProp<ViewStyle>;
  outline? : boolean;
  size?: ButtonSize;
  showIcon?: boolean;
  iconLib?: 'Ionicons' | 'FontAwesome' | 'MaterialIcons' | 'MaterialCommunity';
  iconName?: any;
  iconSize?: number;
  iconColor?: string;
  useGradient?: boolean;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  titleSize = "big",
  titleColor = 'primary300',
  onPress,
  style,
  outline = false,
  size = 'normal',
  useGradient = false,
  isActive = false,
  showIcon = false,
  iconLib = 'FontAwesome',
  iconName,
  iconSize = 20,
  iconColor = palette.neutral,
  disabled =false
}) => {
  const buttonStyle = [btnStyles.buttonStyles[size]];
  const buttonBorder = outline ? ([styles.outline]): null;

  let IconComponent;

  switch (iconLib) {
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'MaterialCommunity':
      IconComponent = MaterialCommunityIcons;
      break;
    default:
      IconComponent = Ionicons;
  }

  const disabledStyle = disabled ? styles.disabledButton : {};

  const iconElement = showIcon && iconName ? (
    <IconComponent name={iconName} size={iconSize} color={iconColor} />
  ) : null;

  const textElement = title ? (
    <StyledText customStyle={[titleSize]} color={titleColor} style={{}}>{title}</StyledText>
  ) : null;

  const content = (
    <View  style={styles.content}>
      {iconElement}
      {textElement}
    </View>
  );

  return (
    <TouchableOpacity style={[buttonStyle, buttonBorder, style, isActive && styles.buttonPressed,disabledStyle]} onPress={onPress} disabled={disabled}>
      {useGradient? (
        <LinearGradient
          colors={[palette.accent100, palette.accent200]}
          style={[buttonStyle, buttonBorder, style]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
   buttonPressed: {
    backgroundColor: palette.accent200,
    color: 'red',
  },
  outline: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: palette.accent200,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    height: undefined,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton:{
    opacity: 0.5,
  }
});

export default Button;
import React, { ReactNode } from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import textStyles from "../themes/Texts";
import palette  from "../themes/Colors";

interface StyledTextProps {
  style?: TextStyle; 
  textStyle?: keyof typeof textStyles; 
  color? : keyof typeof palette;
  children: ReactNode;
}

const styles = StyleSheet.create({

});

const StyledText: React.FC<StyledTextProps> = ({
  style,
  textStyle = 'regular',
  color: colors = 'neutral',
  children,
}) => {
  // const stylesArray: TextStyle[] = [textStyles[textStyle]];
  const defaultTextStyle: TextStyle = textStyles[textStyle] || {};
  const defaultColorStyle: TextStyle = { color: palette[colors] || palette.neutral }; 

  return (
    <Text style={[style, defaultTextStyle, defaultColorStyle]}>
      {children}
    </Text>
  );
};

export default StyledText;


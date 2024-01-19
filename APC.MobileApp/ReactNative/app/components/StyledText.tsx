import React, { ReactNode } from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import textStyles from "../themes/Texts";
import palette  from "../themes/Colors";
import customStyles from "../themes/Styles"

interface StyledTextProps {
  style?: TextStyle; 
  textStyle?: Array<keyof typeof textStyles>; 
  color? : keyof typeof palette;
  customStyles?: keyof typeof customStyles;
  children: ReactNode;
}

const styles = StyleSheet.create({

});


const StyledText: React.FC<StyledTextProps> = ({
  style,
  textStyle = [],
  color: colors = 'neutral',
  customStyles ="my2",
  children,
}) => {
  const defaultStyles = [textStyles.title1, textStyles.light];
  const combinedStyles = [...defaultStyles, ...textStyle.map(key => textStyles[key])];
  const defaultColorStyle: TextStyle = { color: palette[colors] || palette.neutral }; 

  return (
    <Text style={[style, ...combinedStyles, defaultColorStyle,]}>
      {children}
    </Text>
  );
};

export default StyledText;


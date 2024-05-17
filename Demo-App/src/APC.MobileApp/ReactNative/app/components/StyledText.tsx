import React, { ReactNode } from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import palette  from "../themes/Colors";
import customStyles from "../themes/CustomStyles"

interface StyledTextProps {
  style?: TextStyle; 
  customStyle?:Array <keyof typeof customStyles>;
  color? : keyof typeof palette;
  children: ReactNode;
}

const styles = StyleSheet.create({

});


const StyledText: React.FC<StyledTextProps> = ({
  style,
  customStyle = [],
  color: colors = 'neutral',
  children,
}) => {
  const defaultStyles = [customStyles.standar, customStyles.regular];
  const combinedStyles = [...defaultStyles, ...customStyle.map(key => customStyles[key])];
  const defaultColorStyle: TextStyle = { color: palette[colors] || palette.neutral }; 
  return (
    <Text style={[style, ...combinedStyles, defaultColorStyle]}>
      {children}
    </Text>
  );
};

export default StyledText;
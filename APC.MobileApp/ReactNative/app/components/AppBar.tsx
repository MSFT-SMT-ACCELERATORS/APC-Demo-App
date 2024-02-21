import React, { ReactNode } from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import palette from "../themes/Colors";

interface AppBarProps {
  style?: ViewStyle;
  colors?: keyof typeof palette;
  children: ReactNode;
}

const styles = StyleSheet.create({
  appBar: {
    paddingTop: 20, 
    backgroundColor: palette.neutral, 
  },
});

const AppBar: React.FC<AppBarProps> = ({ style, children }) => {
  return (
    <View style={[styles.appBar, style]}>
      <StatusBar backgroundColor={palette.neutral} /> {}
      {children}
    </View>
  );
};

export default AppBar;
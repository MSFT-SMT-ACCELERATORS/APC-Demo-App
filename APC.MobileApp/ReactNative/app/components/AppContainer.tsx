import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Constants from 'expo-constants';
import palette from "../themes/Colors";

interface AppContainerProps {
    style?: ViewStyle;
    colors?: keyof typeof palette;
    children: ReactNode;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.primary300,
      alignItems: 'flex-start'
    },
  });
  
  const AppContainer: React.FC<AppContainerProps> = ({ colors = 'primary300', style, children }) => {
    return <View style={[styles.container, { backgroundColor: palette[colors] }, style]}>{children}</View>;
  };
  
  export default AppContainer;
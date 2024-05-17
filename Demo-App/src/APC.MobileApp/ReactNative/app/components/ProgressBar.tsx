import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import customStyles from '../themes/CustomStyles';

interface ProgressBarProps {
  progress: number;
  height: number;
  backgroundColor?: string;
  gradientColors?: string[];
  style?: ViewStyle
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height,
  backgroundColor = 'transparent',
  gradientColors = ['#00fdee', '#4ad896'],
  style }) => {

  // Use useRef for keeping the animated value
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the value when 'progress' changes
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[customStyles.my5, customStyles.mx4, { height }, style]}>
      <View style={[styles.progressBar, { backgroundColor, borderRadius: height / 2 }]}>
        <Animated.View style={{ width: widthInterpolated, flex: 1, backgroundColor: '#4ad896' }}>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  progressBar: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8e8e97',
  },
  progress: {
    flex: 1,
    height: '100%'
  },
});

export default ProgressBar;

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

interface ProgressBarProps {
  progress: number; // Cambia a number ya que recibiremos un valor directo
  height: number;
  backgroundColor?: string;
  gradientColors?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height, 
  backgroundColor = 'transparent', 
  gradientColors = ['#00fdee', '#4ad896'] }) => {
  
  // Usamos useRef para mantener el valor animado
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animamos el valor cuando 'progress' cambia
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500, // Duración de la animación
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.progressBar, { backgroundColor, height, borderRadius: height/2 }, ]}>
      <Animated.View style={{ width: widthInterpolated, height: '100%' }}>
        <LinearGradient
          colors={gradientColors}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8e8e97',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressBar;

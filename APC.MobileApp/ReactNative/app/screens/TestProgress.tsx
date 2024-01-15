import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

function TestProgress() {
  const [progress, setProgress] = useState(0);
  
  // Función para actualizar el progreso
  const updateProgress = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 10));
  };

  return (
    <View style={styles.container}>
      <Text>Testing ProgressBar!!</Text>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ProgressBar progress={progress} height={10} backgroundColor={'transparent'} gradientColors={['#00fdee', '#4ad896']} />
        <Button title="Aumentar Progresooo!" onPress={updateProgress} />
        <TextInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
});

export default TestProgress;


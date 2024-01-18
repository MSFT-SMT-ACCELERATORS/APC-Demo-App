import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';

import Header from './app/components/Header';
import Welcome from './app/screens/Welcome';
import Landing from './app/screens/Landing';
import Consents from './app/screens/Consents';
import ResidenceLocation from './app/screens/ResidenceLocation';
import StarterPage from './app/screens/StarterPage';
import TestProgress from './app/screens/TestProgress';
import Information from './app/screens/Information';
import Demo from './app/screens/Demo';
import Success from './app/screens/Success';
import { ApiClientProvider } from './app/api/ApiClientProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApiClientProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Demo" component={Demo} options={{ header: () => <Header /> }} />
              <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="Consents" component={Consents} options={{ header: () => <Header /> }} />
              <Stack.Screen name="ResidenceLocation" component={ResidenceLocation} options={{ header: () => <Header /> }} />
              <Stack.Screen name="StarterPage" component={StarterPage} options={{ header: () => <Header /> }} />
              <Stack.Screen name="Information" component={Information} options={{ header: () => <Header /> }} />
              <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
              <Stack.Screen name="TestProgress" component={TestProgress} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApiClientProvider>
  );
}

export default App;
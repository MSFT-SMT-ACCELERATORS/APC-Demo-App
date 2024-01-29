import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';

import Header from './app/components/Header';
import Welcome from './app/screens/Welcome';
import Landing from './app/screens/Landing';
import Consents from './app/screens/Consents';
import TestProgress from './app/screens/TestProgress';
import Demo from './app/screens/Demo';
import Success from './app/screens/Success';
import { ApiClientProvider } from './app/api/ApiClientProvider';
import Steps from './app/screens/Steps';
import Debug from './app/screens/Debug';
import axios from 'axios';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

function App() {

  const getData = async () => {
    try {
      const res = await axios.get('https://api.ipify.org/?format=json');
      console.log(res.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ApiClientProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name='TestProgress' component={TestProgress} />
            <Stack.Screen name='Demo' component={Demo} options={{ header: () => <Header /> }} />
            <Stack.Screen name='Debug' component={Debug} options={{ header: () => <Header /> }} />
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Consents' component={Consents} options={{ header: () => <Header /> }} />
            <Stack.Screen name='Steps' component={Steps} options={{ header: () => <Header /> }} />
            <Stack.Screen name='Success' component={Success} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApiClientProvider>
  );
}

export default App;
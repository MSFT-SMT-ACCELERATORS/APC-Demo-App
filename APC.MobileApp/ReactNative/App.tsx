import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';

import Header from './app/components/Header';
import Welcome from './app/screens/Welcome';
import Consents from './app/screens/Consents';
import Success from './app/screens/Success';
import Steps from './app/screens/Steps';
import Debug from './app/screens/Debug';
import { ApiClientProvider } from './app/api/ApiClientProvider';
import Settings from './app/screens/Settings';
import { useState } from 'react';
import OverlaySpinner from './app/components/OverlaySpinner';


function App() {
  const Stack = createNativeStackNavigator();
  const [loadingState, setLoadingState] = useState<{ isLoading: boolean; text?: string }>({ isLoading: false });

  const setLoading = (isLoading: boolean, text?: string) => {
    setLoadingState({ isLoading, text });
  };

  return (
    <ApiClientProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='Settings' options={{ header: () => <Header /> }}>
              {(props) => <Settings {...props} setLoading={setLoading} />}
            </Stack.Screen>
            <Stack.Screen name='Welcome' options={{ headerShown: false }} >
              {(props) => <Welcome {...props} setLoading={setLoading} />}
            </Stack.Screen>
            <Stack.Screen name='Consents' options={{ header: () => <Header /> }}>
              {(props) => <Consents {...props} setLoading={setLoading} />}
            </Stack.Screen>
            <Stack.Screen name='Steps' options={{ header: () => <Header /> }}>
              {(props) => <Steps {...props} setLoading={setLoading} />}
            </Stack.Screen>
            <Stack.Screen name='Success' options={{ headerShown: false }} >
              {(props) => <Success {...props} setLoading={setLoading} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>

        {loadingState.isLoading && <OverlaySpinner text={loadingState.text} />}
      </PaperProvider>
    </ApiClientProvider>
  );
}

export default App;
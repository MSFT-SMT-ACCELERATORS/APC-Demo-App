import AsyncStorage from '@react-native-async-storage/async-storage';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export type AppConfiguration = {
  offlineMode: boolean;
  offlineSimSwapDetected: boolean;
  offlineLatitude: number;
  offlineLongitude: number;  

  apcMockMode: boolean;

  radiusKm: number;
};

const CONFIG_KEY = 'app_configuration';

export const storeConfigurations = async (configurations: AppConfiguration) => {
  try {
    const jsonValue = JSON.stringify(configurations);
    await AsyncStorage.setItem(CONFIG_KEY, jsonValue);
  } catch (e) {
    // guardar error
  }
};

export const readConfigurations = async (): Promise<AppConfiguration | null> => {
  // await AsyncStorage.clear();
  try {
    const jsonValue = await AsyncStorage.getItem(CONFIG_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // leer error
    return null;
  }
};

export const updateConfiguration = async <T extends keyof AppConfiguration>(key: T, value: AppConfiguration[T]) => {
    try {
      const currentConfigString = await AsyncStorage.getItem(CONFIG_KEY);
      const currentConfig = currentConfigString != null ? JSON.parse(currentConfigString) : {};
      const newConfig = {
        ...currentConfig,
        [key]: value,
      };
      await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
    } catch (e) {
      // Manejar error
    }
  };

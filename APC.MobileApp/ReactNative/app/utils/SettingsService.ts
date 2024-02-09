import AsyncStorage from '@react-native-async-storage/async-storage';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export enum ConnectionMode {
  Online = "online",
  Offline = "offline",
  Mock = "mock"
}
export type AppConfiguration = {
  connectionMode: ConnectionMode;
  radiusKm: number;
  offlineLastSimChange: string;
  offlineLatitude: number;
  offlineLongitude: number;
  offlinePhoneNumber: string;
};

const CONFIG_KEY = 'app_configuration';

export const defaultConfig = {
  connectionMode: 'online',
  radiusKm: 10,
  offlineLatitude: 0,
  offlineLongitude: 0,
  offlineLastSimChange: '',
  offlinePhoneNumber: '',
} as AppConfiguration;

export const storeConfigurations = async (configurations: AppConfiguration) => {
  try {
    const jsonValue = JSON.stringify(configurations);
    await AsyncStorage.setItem(CONFIG_KEY, jsonValue);
  } catch (e) {
    // guardar error
  }
};

export const readConfigurations = async (): Promise<AppConfiguration> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONFIG_KEY);

    if (jsonValue)
      return JSON.parse(jsonValue);

    return await initDefaultConfig();
  } catch (e) {
    return defaultConfig;
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
  }
};

export const initDefaultConfig = async () => {
  await storeConfigurations(defaultConfig);

  return defaultConfig;
}

export const clearConfig = async () => {
  AsyncStorage.removeItem(CONFIG_KEY);
}
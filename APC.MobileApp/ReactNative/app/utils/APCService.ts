import * as Network from 'expo-network';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios'


export const getIPAddress = async () => {

    if (Platform.OS === 'web') {
        try {
            const response = await axios.get('https://api.ipify.org');
            const data = await response.data;

            return data;
        } catch (error) {
            console.error("Error al obtener la dirección IP en la web", error);
        }
    } else {
        // Implementar lógica para obtener la IP en dispositivos móviles
        try {
            const ip = await Network.getIpAddressAsync();
            return ip;
        } catch (error) {
            console.error("Error al obtener la dirección IP en el dispositivo móvil", error);
        }
    }
}

export const getGPSLocation = async () => {
    async function getLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
    }

    try {
        await getLocationPermission();

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
        console.log(location);

        // const { latitude, longitude } = location.coords;

        return location;
    } catch (error) {
        console.error("Error getting location: ", error);
    }

}



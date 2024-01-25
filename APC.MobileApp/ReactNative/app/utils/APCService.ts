import * as Network from 'expo-network';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios'
import { storeConfigurations, readConfigurations, updateConfiguration, AppConfiguration } from '../utils/ConfigStorage'
import { useApiClient } from '../api/ApiClientProvider';
import { APCApi } from '../api/generated';


export const getIPAddress = async () => {
    if (Platform.OS === 'web') {
        return await ipify();
    } else {
        try {
            const ip = await Network.getIpAddressAsync();
            return ip;
        } catch (error) {
            console.error("Error al obtener la dirección IP en el dispositivo móvil", error);
        }
    }
}

export const ipify = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const data = await response.data;

        return data.ip;
    } catch (error) {
        console.error("Error al obtener la dirección IP en la web", error);
        return "-";
    }
}

export const getDeviceGPSLocation = async (): Promise<Location.LocationObjectCoords> => {
    async function getLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
    }

    await getLocationPermission();

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
    
    return location.coords;
}

export const getPhoneNumber = async (apiClient: APCApi): Promise<string> => {
    const publicIp = await ipify();

    const response = await apiClient.aPCPhoneNumberGet("networkId", "deviceIdPhoneNumber", "deviceIdNetworkAccessIdentifier", publicIp, "deviceIdIpv6Address");

    return response.data.devicePhoneNumber ?? "-";
}

export const getAPCLocation = async (client: APCApi): Promise<Location.LocationObjectCoords> => {
    const ip = await ipify();

    const response = await client.aPCDeviceLocationPost({
        deviceId: {
            ipv4Address: ip,
            ipv6Address: "ipv6Address",
            networkAccessIdentifier: "networkAccessIdentifier",
            phoneNumber: "phoneNumber"
        },
        networkId: "networkId"
    });

    const location = response.data.locationArea?.circle;

    return {
        latitude: location?.latitude,
        longitude: location?.longitude,
        accuracy: location?.radius,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    } as Location.LocationObjectCoords
}

export const matchesAPCLocation = async (client: APCApi, coords: Location.LocationObjectCoords) => {
    const config = await readConfigurations();

    if (!config) {
        throw "Config is not defined";
    }

    const ip = await ipify();

    const response = await client.aPCVerifyDeviceLocationPost({
        deviceId: {
            ipv4Address: ip,
            ipv6Address: "ipv6Address",
            networkAccessIdentifier: "networkAccessIdentifier",
            phoneNumber: "phoneNumber"
        },
        locationArea: {
            areaType: "CIRCLE",
            circle: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                radius: coords.accuracy ?? undefined
            }
        },
        networkId: "networkId"
    });

    return response.data;
}

export const findCoords = async (country: string, state: string, city: string): Promise<Location.LocationObjectCoords> => {
    const config = await readConfigurations();

    if (!config) {
        throw "Config is not defined";
    }

    return {
        latitude: 39.4801,
        longitude: -0.3634,
        accuracy: 1000,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    } as Location.LocationObjectCoords
}

export const matchesCoords = async (coordA: Location.LocationObjectCoords, coordB: Location.LocationObjectCoords): Promise<Boolean> => {

    function calcHaversineDistance(coordA: Location.LocationObjectCoords, coordB: Location.LocationObjectCoords): number {
        const radioTierra = 6371e3; // Radio de la Tierra en metros
        const rad = Math.PI / 180;
        const deltaLat = (coordB.latitude - coordA.latitude) * rad;
        const deltaLon = (coordB.longitude - coordA.longitude) * rad;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(coordA.latitude * rad) * Math.cos(coordB.latitude * rad) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radioTierra * c; // Resultado en metros
    }

    const config = await readConfigurations();

    if (!config) {
        throw "Config is not defined";
    }

    const distance = calcHaversineDistance(coordA, coordB);
    const maxAllowedDistance = (coordA.accuracy ?? 0) + (coordB.accuracy ?? 0) + (config.radiusKm || 10) * 1000;

    return distance <= maxAllowedDistance;
}
import * as Network from 'expo-network';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios'
import { storeConfigurations, readConfigurations, updateConfiguration, AppConfiguration, ConnectionMode } from './SettingsService'
import { useApiClient } from '../api/ApiClientProvider';
import { APCApi, AuthApi, Configuration } from '../api/generated';
import * as BingService from '../utils/BingService'
import { LocationObjectCoords } from 'expo-location';


export interface Position {
    coords: LocationObjectCoords;
    location?: BingService.Location;
}

export const verificateAPCLocation = async (apiClient: APCApi) => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Offline) {
        return { coords: getLocationCoords(config.offlineLatitude, config.offlineLongitude) } as Position;
    }

    const ip = await ipify();
    const coords = await getDeviceGPSLocation();
    let accuracy = coords.coords.accuracy === null ? undefined : coords.coords.accuracy;
    const networkCode = await getNetworkCode(apiClient);
    const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    console.log(coords.coords.latitude + "--" + coords.coords.longitude + "--" + accuracy + " --" + networkCode);
    const response = await apiClient.apiAPCDeviceLocationLocationverifyPost({
        networkIdentifier: {
            identifierType: "NetworkCode",
            identifier: networkCode
        },
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
        accuracy: accuracy,
        device: {
            ipv4Address: {
                ipv4: ip,
                port: 0
            }
        }
    }, mockHeader);

    console.log("Respuesta completa:", JSON.stringify(response, null, 2));

    console.log("VALIDACION: " + response.data.verificationResult);

    return response.data.verificationResult;
}

export const getPhoneNumber = async (apiClient: APCApi, phoneNumber: string): Promise<string> => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Mock || config.connectionMode == ConnectionMode.Offline) {
        return config.offlinePhoneNumber;
    }
    // if (config.connectionMode == ConnectionMode.Offline) {
    //     return config.offlinePhoneNumber;
    // }
    // const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;

    const networkCode = await getNetworkCode(apiClient);
    const response = await apiClient.apiAPCNumberVerificationNumberverifyPost({
        networkIdentifier: {
            identifierType: 'NetworkCode',
            identifier: networkCode
        },
        phoneNumber: '+34682055596',
        redirectUri: ''
    });

    console.log("Respuesta completa:", JSON.stringify(response, null, 2));

    return '';
}


export const getNetworkCode = async (apiClient: APCApi): Promise<string> => {

    const config = await readConfigurations();
    if (config.connectionMode == ConnectionMode.Mock || config.connectionMode == ConnectionMode.Offline) {
        return 'Telefonica_Spain'
    }

    // const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    //'90.167.43.219'

    const ip = await ipify();

    const response = await apiClient.apiAPCDeviceNetworkNetworkretrievePost({
        identifierType: 'IPv4',
        identifier: '90.167.43.219'
    });
    console.log("Respuesta completa:", JSON.stringify(response, null, 2));

    console.log("CODE: " + response.data.networkCode);
    return response.data.networkCode ?? 'Empty';
}

export const checkSimChange = async (apiClient: APCApi, phoneNumber: string) => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Offline) {
        return config.offlineLastSimChange;
    }

    const networkCode = await getNetworkCode(apiClient);
    const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    const response = await apiClient.apiAPCSimSwapSimSwapverifyPost({
        phoneNumber: phoneNumber,
        maxAgeHours: 0,
        networkIdentifier: {
            identifierType: 'NetworkCode',
            identifier: networkCode
        }
    }, mockHeader)

    console.log("Respuesta completa:", JSON.stringify(response, null, 2));

    return response.data.verificationResult;
}



// export const getDeviceGPSLocation = async () => {
//     async function getLocationPermission() {
//         console.log("Requesting gps permission...");
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             console.error('Permission to access location was denied');
//             return;
//         }
//         console.log("Requesting gps permission... OK");
//     }

//     const config = await readConfigurations();
//     await getLocationPermission();

//     let location: Location.LocationObject;
//     console.log("Getting current position...");

//     location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
//     console.log("Getting current position... OK");

//     const bingLocation = config.connectionMode != ConnectionMode.Offline ? await BingService.translateCoordsToLocation(location.coords) : undefined;

//     return { coords: location.coords, location: bingLocation } as Position;

// }

export const getDeviceGPSLocation = async () => {
    async function getLocationPermission() {
        console.log("Requesting gps permission...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
        console.log("Requesting gps permission... OK");
    }

    const config = await readConfigurations();
    await getLocationPermission();

    let location: Location.LocationObject;
    console.log("Getting current position...");

    location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    let coords = location.coords;
    coords = getLocationCoords(41.3851, 2.1734, 0);
    console.log("Getting current position... OK");

    const bingLocation = config.connectionMode != ConnectionMode.Offline ? await BingService.translateCoordsToLocation(coords) : undefined;

    return { coords: coords, location: bingLocation } as Position;

}

export const getLocationCoords = (latitude: number, longitude: number, accuracy: number = 200) => {
    return {
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    } as Location.LocationObjectCoords
}

export const matchesCoords = async (coordA: Location.LocationObjectCoords, coordB: Location.LocationObjectCoords, coordC: number): Promise<Boolean> => {

    function calcHaversineDistance(coordA: Location.LocationObjectCoords, coordB: Location.LocationObjectCoords): number {
        const earthRadius = 6371e3; // Earth radius (m)
        const rad = Math.PI / 180;
        const deltaLat = (coordB.latitude - coordA.latitude) * rad;
        const deltaLon = (coordB.longitude - coordA.longitude) * rad;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(coordA.latitude * rad) * Math.cos(coordB.latitude * rad) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }

    const config = await readConfigurations();

    const distance = calcHaversineDistance(coordA, coordB);
    const maxAllowedDistance = (coordA.accuracy ?? 0) + (coordB.accuracy ?? 0) + config.radiusKm * 1000;

    return distance <= maxAllowedDistance;
}

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

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

export const getAPCLocation = async (client: APCApi) => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Offline) {
        return { coords: getLocationCoords(config.offlineLatitude, config.offlineLongitude) } as Position;
    }

    const ip = await ipify();

    const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    const response = await client.aPCDeviceLocationPost({
        deviceId: {
            ipv4Address: ip,
            ipv6Address: "ipv6Address",
            networkAccessIdentifier: "networkAccessIdentifier",
            phoneNumber: "phoneNumber"
        },
        networkId: "networkId"
    }, mockHeader);

    const circle = response.data.locationArea?.circle;

    const coords = {
        latitude: circle?.latitude,
        longitude: circle?.longitude,
        accuracy: circle?.radius,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    } as Location.LocationObjectCoords

    const bingLocation = await BingService.translateCoordsToLocation(coords);
    return { coords: coords, location: bingLocation } as Position;
}

export const matchesAPCLocation = async (client: APCApi, coords: Location.LocationObjectCoords) => {
    const apcLocation = await getAPCLocation(client);

    return {
        verificationResult: await matchesCoords(coords, apcLocation.coords)
    }


    // const config = await readConfigurations();

    // if (config.connectionMode == ConnectionMode.Mock || config.connectionMode == ConnectionMode.Offline) {
    //     const mockAPCLocation = await getAPCLocation(client);

    //     return {
    //         verificationResult: await matchesCoords(coords, mockAPCLocation.coords)
    //     }
    // }

    // const ip = await ipify();

    // const response = await client.aPCVerifyDeviceLocationPost({
    //     deviceId: {
    //         ipv4Address: ip,
    //         ipv6Address: "ipv6Address",
    //         networkAccessIdentifier: "networkAccessIdentifier",
    //         phoneNumber: "phoneNumber"
    //     },
    //     locationArea: {
    //         areaType: "CIRCLE",
    //         circle: {
    //             latitude: coords.latitude,
    //             longitude: coords.longitude,
    //             radius: coords.accuracy ?? undefined
    //         }
    //     },
    //     networkId: "networkId"
    // });

    // console.log(response.data);
    // return response.data;
}

export const getPhoneNumber = async (apiClient: APCApi): Promise<string> => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Mock || config.connectionMode == ConnectionMode.Offline) {
        return config.offlinePhoneNumber;
    }
    // if (config.connectionMode == ConnectionMode.Offline) {
    //     return config.offlinePhoneNumber;
    // }
    // const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;

    const publicIp = await ipify();

    const response = await apiClient.apiAPCNumberVerificationNumberretrievePost(
        {
            identifierType: 'IPv4',
            identifier: publicIp
        });

    return response.data.phoneNumber ?? "";
}


export const getNetworkCode = async (apiClient: APCApi): Promise<string> => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Mock || config.connectionMode == ConnectionMode.Offline) {
        return config.offlinePhoneNumber;
    }
    // if (config.connectionMode == ConnectionMode.Offline) {
    //     return config.offlinePhoneNumber;
    // }
    // const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;

    const publicIp = await ipify();

    const response = await apiClient.apiAPCDeviceNetworkNetworkretrievePost(
        {
            identifierType: 'IPv4',
            identifier: publicIp
        });

    return response.data.networkCode ?? "";
}

export const checkSimChange = async (apiClient: APCApi) => {
    const config = await readConfigurations();

    if (config.connectionMode == ConnectionMode.Offline) {
        return config.offlineLastSimChange;
    }

    const phoneNumber = await getPhoneNumberAPC();
    const networkCode = await getNetworkCode(apiClient);
    const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    const response = await apiClient.apiAPCSimSwapSimSwapverifyPost({
        phoneNumber: phoneNumber,
        maxAgeHours: 0,
        networkIdentifier: {
            identifierType: networkCode,
            identifier: ''
        }
    }, mockHeader)

    return response.data.verificationResult;
}



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
    console.log("Getting current position... OK");

    const bingLocation = config.connectionMode != ConnectionMode.Offline ? await BingService.translateCoordsToLocation(location.coords) : undefined;

    return { coords: location.coords, location: bingLocation } as Position;

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
//     let coords = location.coords;
//     coords = getLocationCoords(40.4168, -3.7038, 0);
//     console.log("Getting current position... OK");

//     const bingLocation = config.connectionMode != ConnectionMode.Offline ? await BingService.translateCoordsToLocation(coords) : undefined;

//     return { coords: coords, location: bingLocation } as Position;

// }

export const getLocationCoords = (latitude: number, longitude: number, accuracy: number = 1000) => {
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

export const matchesCoords = async (coordA: Location.LocationObjectCoords, coordB: Location.LocationObjectCoords): Promise<Boolean> => {

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


export const getToken = async (): Promise<string> => {

    const configuration = new Configuration({ basePath: "https://apc-proxy-prv-002.azurewebsites.net" });
    const authApiClient = new AuthApi(configuration);
    // const config = await readConfigurations();
    // const mockHeader = config.connectionMode == ConnectionMode.Mock ? { headers: { 'X-Use-Mock': true } } : undefined;
    const response = await authApiClient.apiAuthTokenGet();

    if (response.data.token === null || response.data.token === undefined) {
        throw new Error('Token is missing from the response');
    }

    return response.data.token;
}


export const getPhoneNumberAPC = async () => {

    const token= await getToken();
    const config = {
        headers: {
          'Authorization':token,
          'Content-Type': 'application/json'
        }
      };
    
      const publicIp = await ipify();
      const data = {
        identifierType: 'IPv4',
        identifier: publicIp
      };
    
      try {
        const response = await axios.post('https://eastus.prod.apcgatewayapi.azure.com/number-verification/number:retrieve',
        data,
        config);

        console.log(response.data); 
    
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud POST');
        throw error; 
      }
}

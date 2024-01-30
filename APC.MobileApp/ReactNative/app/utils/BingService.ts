import axios from "axios";
import { LocationObjectCoords } from "expo-location";

export interface Location {
    country: string,
    state: string,
    city: string
}

export const translateCoordsToLocation = async (coords: LocationObjectCoords, verbosePlaceNames: boolean = false) => {
    const apiKey = 'ApOlwQ1nNnrqWQ2jtz9Wyr27aAsnYsJpDeSr35Ej_-0_ntLEh0Ro0ZBXil0Rlnec';
    const res = await axios.get(`http://dev.virtualearth.net/REST/v1/Locations/${coords.latitude},${coords.longitude}?verboseplacenames=${verbosePlaceNames}&key=${apiKey}`);

    if (res.status == 200 && res.data && res.data.resourceSets[0].resources[0].address) {
        const address = res.data.resourceSets[0].resources[0].address;

        return {
            country: address.countryRegion,
            state: address.adminDistrict,
            city: address.locality
        } as Location
    } 

    return null;
}
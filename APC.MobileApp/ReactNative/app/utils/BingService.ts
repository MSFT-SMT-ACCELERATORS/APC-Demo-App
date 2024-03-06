import axios from "axios";
import { LocationObjectCoords } from "expo-location";
import countries from 'i18n-iso-countries';
import { BING_MAPS_API_KEY } from './SettingsService'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


const getCountryCodeByName = (countryName: string): string | undefined => {
  return countries.getAlpha2Code(countryName, 'en');
};

export interface Location {
  country: string,
  state: string,
  city: string
}

interface BingAutosuggestResponse {
  resourceSets: Array<{
    resources: Array<{
      value: BingSuggestion[];
    }>;
  }>;
}

interface BingSuggestion {
  address: {
    adminDistrict?: string;
    adminDistrict2?: string;
    countryRegion?: string;
    countryRegionIso2?: string;
    formattedAddress?: string;
    locality?: string;
  };
}



export const translateCoordsToLocation = async (coords: LocationObjectCoords, verbosePlaceNames: boolean = false) => {
    const apiKey = 'ApOlwQ1nNnrqWQ2jtz9Wyr27aAsnYsJpDeSr35Ej_-0_ntLEh0Ro0ZBXil0Rlnec';
    const res = await axios.get(`https://dev.virtualearth.net/REST/v1/Locations/${coords.latitude},${coords.longitude}?verboseplacenames=${verbosePlaceNames}&key=${apiKey}`);

  if (res.status == 200 && res.data && res.data.resourceSets[0].resources[0].address) {
    const address = res.data.resourceSets[0].resources[0].address;

    return {
      country: address.countryRegion,
      state: address.adminDistrict,
      city: address.locality
    } as Location
  }

  return undefined;
}


export const getStateSuggestions = async (query: string, country: string): Promise<string[]> => {

  const countryCode = countries.getAlpha2Code(country, 'en') || '';
  const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${encodeURIComponent(query)}&countryFilter=${countryCode}&key=${BING_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data: BingAutosuggestResponse = await response.json();
    const stateSuggestions = data.resourceSets[0].resources[0].value
      .filter((suggestion: BingSuggestion) => {
        return suggestion.address.adminDistrict?.toLowerCase().includes(query.toLowerCase());
      })
      .map((suggestion: BingSuggestion) => suggestion.address.adminDistrict)
      .filter((adminDistrict): adminDistrict is string => adminDistrict != null);
    return stateSuggestions;
  } catch (error) {
    console.error('Error fetching state suggestions from Bing Maps:', error);
    return [];
  }
};

export const getCitySuggestions = async (query: string, country: string, state: string): Promise<string[]> => {

  const countryCode = countries.getAlpha2Code(country, 'en') || '';
  const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${encodeURIComponent(query)}&countryFilter=${countryCode}&key=${BING_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data: BingAutosuggestResponse = await response.json();
    const citySuggestions = data.resourceSets[0].resources[0].value
      .filter((suggestion: BingSuggestion) => {
        const adminDistrictMatch = suggestion.address.adminDistrict?.toLowerCase() === state.toLowerCase();
        const localityMatch = suggestion.address.locality?.toLowerCase().includes(query.toLowerCase());
        return adminDistrictMatch && localityMatch;
      })
      .map((suggestion: BingSuggestion) => suggestion.address.locality)
      .filter((locality): locality is string => locality != null);

    return citySuggestions;
  } catch (error) {
    console.error('Error fetching state suggestions from Bing Maps:', error);
    return [];
  }
};

export const getCityCoordinates = async (cityName: string, countryName: string) => {
  const encodedCity = encodeURIComponent(`${cityName}, ${countryName}`);
  const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${encodedCity}&key=${BING_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.resourceSets[0].resources.length > 0) {
      const coordinates = data.resourceSets[0].resources[0].point.coordinates;
      return {
        latitude: coordinates[0],
        longitude: coordinates[1]
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching coordinates from Bing Maps:', error);
    return null;
  }
};



/* tslint:disable */
/* eslint-disable */
/**
 * APC.ProxyServer
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface Circle
 */
export interface Circle {
    /**
     * 
     * @type {number}
     * @memberof Circle
     */
    'latitude'?: number;
    /**
     * 
     * @type {number}
     * @memberof Circle
     */
    'longitude'?: number;
    /**
     * 
     * @type {number}
     * @memberof Circle
     */
    'radius'?: number;
}
/**
 * 
 * @export
 * @interface DeviceId
 */
export interface DeviceId {
    /**
     * 
     * @type {string}
     * @memberof DeviceId
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DeviceId
     */
    'networkAccessIdentifier'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DeviceId
     */
    'ipv4Address'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DeviceId
     */
    'ipv6Address'?: string | null;
}
/**
 * 
 * @export
 * @interface DeviceNumber
 */
export interface DeviceNumber {
    /**
     * 
     * @type {string}
     * @memberof DeviceNumber
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DeviceNumber
     */
    'hashedPhoneNumber'?: string | null;
}
/**
 * 
 * @export
 * @interface LocationArea
 */
export interface LocationArea {
    /**
     * 
     * @type {string}
     * @memberof LocationArea
     */
    'areaType'?: string | null;
    /**
     * 
     * @type {Circle}
     * @memberof LocationArea
     */
    'circle'?: Circle;
}
/**
 * 
 * @export
 * @interface LocationRequest
 */
export interface LocationRequest {
    /**
     * 
     * @type {DeviceId}
     * @memberof LocationRequest
     */
    'deviceId'?: DeviceId;
    /**
     * 
     * @type {string}
     * @memberof LocationRequest
     */
    'networkId'?: string | null;
}
/**
 * 
 * @export
 * @interface LocationResponse
 */
export interface LocationResponse {
    /**
     * 
     * @type {LocationArea}
     * @memberof LocationResponse
     */
    'locationArea'?: LocationArea;
    /**
     * 
     * @type {string}
     * @memberof LocationResponse
     */
    'lastLocationTime'?: string;
}
/**
 * 
 * @export
 * @interface NumberRetrieveResponse
 */
export interface NumberRetrieveResponse {
    /**
     * 
     * @type {string}
     * @memberof NumberRetrieveResponse
     */
    'devicePhoneNumber'?: string | null;
}
/**
 * 
 * @export
 * @interface NumberVerificationMatchResponse
 */
export interface NumberVerificationMatchResponse {
    /**
     * 
     * @type {boolean}
     * @memberof NumberVerificationMatchResponse
     */
    'devicePhoneNumberVerified'?: boolean;
}
/**
 * 
 * @export
 * @interface NumberVerificationRequest
 */
export interface NumberVerificationRequest {
    /**
     * 
     * @type {DeviceNumber}
     * @memberof NumberVerificationRequest
     */
    'deviceNumber'?: DeviceNumber;
    /**
     * 
     * @type {string}
     * @memberof NumberVerificationRequest
     */
    'networkID'?: string | null;
    /**
     * 
     * @type {DeviceId}
     * @memberof NumberVerificationRequest
     */
    'deviceId'?: DeviceId;
}
/**
 * 
 * @export
 * @interface ProblemDetails
 */
export interface ProblemDetails {
    [key: string]: any;

    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    'type'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    'title'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProblemDetails
     */
    'status'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    'detail'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    'instance'?: string | null;
}
/**
 * 
 * @export
 * @interface VerifyLocationRequest
 */
export interface VerifyLocationRequest {
    /**
     * 
     * @type {DeviceId}
     * @memberof VerifyLocationRequest
     */
    'deviceId': DeviceId;
    /**
     * 
     * @type {string}
     * @memberof VerifyLocationRequest
     */
    'networkId': string;
    /**
     * 
     * @type {LocationArea}
     * @memberof VerifyLocationRequest
     */
    'locationArea': LocationArea;
    /**
     * 
     * @type {number}
     * @memberof VerifyLocationRequest
     */
    'maxAge'?: number;
}
/**
 * 
 * @export
 * @interface VerifyLocationResponse
 */
export interface VerifyLocationResponse {
    /**
     * 
     * @type {string}
     * @memberof VerifyLocationResponse
     */
    'lastLocationTime'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof VerifyLocationResponse
     */
    'verificationResult'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof VerifyLocationResponse
     */
    'matchRate'?: number | null;
}

/**
 * APCApi - axios parameter creator
 * @export
 */
export const APCApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {LocationRequest} [locationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCDeviceLocationPost: async (locationRequest?: LocationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/APC/device-location`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(locationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [networkID] 
         * @param {string} [deviceIdPhoneNumber] 
         * @param {string} [deviceIdNetworkAccessIdentifier] 
         * @param {string} [deviceIdIpv4Address] 
         * @param {string} [deviceIdIpv6Address] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCPhoneNumberGet: async (networkID?: string, deviceIdPhoneNumber?: string, deviceIdNetworkAccessIdentifier?: string, deviceIdIpv4Address?: string, deviceIdIpv6Address?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/APC/phone-number`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (networkID !== undefined) {
                localVarQueryParameter['NetworkID'] = networkID;
            }

            if (deviceIdPhoneNumber !== undefined) {
                localVarQueryParameter['DeviceId.PhoneNumber'] = deviceIdPhoneNumber;
            }

            if (deviceIdNetworkAccessIdentifier !== undefined) {
                localVarQueryParameter['DeviceId.NetworkAccessIdentifier'] = deviceIdNetworkAccessIdentifier;
            }

            if (deviceIdIpv4Address !== undefined) {
                localVarQueryParameter['DeviceId.Ipv4Address'] = deviceIdIpv4Address;
            }

            if (deviceIdIpv6Address !== undefined) {
                localVarQueryParameter['DeviceId.Ipv6Address'] = deviceIdIpv6Address;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [yourIp] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCTestGet: async (yourIp?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/APC/test`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (yourIp !== undefined) {
                localVarQueryParameter['yourIp'] = yourIp;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {VerifyLocationRequest} [verifyLocationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCVerifyDeviceLocationPost: async (verifyLocationRequest?: VerifyLocationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/APC/verify-device-location`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(verifyLocationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {NumberVerificationRequest} [numberVerificationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCVerifyPost: async (numberVerificationRequest?: NumberVerificationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/APC/verify`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(numberVerificationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * APCApi - functional programming interface
 * @export
 */
export const APCApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = APCApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {LocationRequest} [locationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aPCDeviceLocationPost(locationRequest?: LocationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LocationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aPCDeviceLocationPost(locationRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.aPCDeviceLocationPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {string} [networkID] 
         * @param {string} [deviceIdPhoneNumber] 
         * @param {string} [deviceIdNetworkAccessIdentifier] 
         * @param {string} [deviceIdIpv4Address] 
         * @param {string} [deviceIdIpv6Address] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aPCPhoneNumberGet(networkID?: string, deviceIdPhoneNumber?: string, deviceIdNetworkAccessIdentifier?: string, deviceIdIpv4Address?: string, deviceIdIpv6Address?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NumberRetrieveResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aPCPhoneNumberGet(networkID, deviceIdPhoneNumber, deviceIdNetworkAccessIdentifier, deviceIdIpv4Address, deviceIdIpv6Address, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.aPCPhoneNumberGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {string} [yourIp] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aPCTestGet(yourIp?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aPCTestGet(yourIp, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.aPCTestGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {VerifyLocationRequest} [verifyLocationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aPCVerifyDeviceLocationPost(verifyLocationRequest?: VerifyLocationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VerifyLocationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aPCVerifyDeviceLocationPost(verifyLocationRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.aPCVerifyDeviceLocationPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {NumberVerificationRequest} [numberVerificationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aPCVerifyPost(numberVerificationRequest?: NumberVerificationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NumberVerificationMatchResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aPCVerifyPost(numberVerificationRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.aPCVerifyPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * APCApi - factory interface
 * @export
 */
export const APCApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = APCApiFp(configuration)
    return {
        /**
         * 
         * @param {LocationRequest} [locationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCDeviceLocationPost(locationRequest?: LocationRequest, options?: any): AxiosPromise<LocationResponse> {
            return localVarFp.aPCDeviceLocationPost(locationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [networkID] 
         * @param {string} [deviceIdPhoneNumber] 
         * @param {string} [deviceIdNetworkAccessIdentifier] 
         * @param {string} [deviceIdIpv4Address] 
         * @param {string} [deviceIdIpv6Address] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCPhoneNumberGet(networkID?: string, deviceIdPhoneNumber?: string, deviceIdNetworkAccessIdentifier?: string, deviceIdIpv4Address?: string, deviceIdIpv6Address?: string, options?: any): AxiosPromise<NumberRetrieveResponse> {
            return localVarFp.aPCPhoneNumberGet(networkID, deviceIdPhoneNumber, deviceIdNetworkAccessIdentifier, deviceIdIpv4Address, deviceIdIpv6Address, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [yourIp] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCTestGet(yourIp?: string, options?: any): AxiosPromise<string> {
            return localVarFp.aPCTestGet(yourIp, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VerifyLocationRequest} [verifyLocationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCVerifyDeviceLocationPost(verifyLocationRequest?: VerifyLocationRequest, options?: any): AxiosPromise<VerifyLocationResponse> {
            return localVarFp.aPCVerifyDeviceLocationPost(verifyLocationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {NumberVerificationRequest} [numberVerificationRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aPCVerifyPost(numberVerificationRequest?: NumberVerificationRequest, options?: any): AxiosPromise<NumberVerificationMatchResponse> {
            return localVarFp.aPCVerifyPost(numberVerificationRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * APCApi - object-oriented interface
 * @export
 * @class APCApi
 * @extends {BaseAPI}
 */
export class APCApi extends BaseAPI {
    /**
     * 
     * @param {LocationRequest} [locationRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public aPCDeviceLocationPost(locationRequest?: LocationRequest, options?: AxiosRequestConfig) {
        return APCApiFp(this.configuration).aPCDeviceLocationPost(locationRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [networkID] 
     * @param {string} [deviceIdPhoneNumber] 
     * @param {string} [deviceIdNetworkAccessIdentifier] 
     * @param {string} [deviceIdIpv4Address] 
     * @param {string} [deviceIdIpv6Address] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public aPCPhoneNumberGet(networkID?: string, deviceIdPhoneNumber?: string, deviceIdNetworkAccessIdentifier?: string, deviceIdIpv4Address?: string, deviceIdIpv6Address?: string, options?: AxiosRequestConfig) {
        return APCApiFp(this.configuration).aPCPhoneNumberGet(networkID, deviceIdPhoneNumber, deviceIdNetworkAccessIdentifier, deviceIdIpv4Address, deviceIdIpv6Address, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [yourIp] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public aPCTestGet(yourIp?: string, options?: AxiosRequestConfig) {
        return APCApiFp(this.configuration).aPCTestGet(yourIp, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VerifyLocationRequest} [verifyLocationRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public aPCVerifyDeviceLocationPost(verifyLocationRequest?: VerifyLocationRequest, options?: AxiosRequestConfig) {
        return APCApiFp(this.configuration).aPCVerifyDeviceLocationPost(verifyLocationRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {NumberVerificationRequest} [numberVerificationRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public aPCVerifyPost(numberVerificationRequest?: NumberVerificationRequest, options?: AxiosRequestConfig) {
        return APCApiFp(this.configuration).aPCVerifyPost(numberVerificationRequest, options).then((request) => request(this.axios, this.basePath));
    }
}




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
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
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
 * @interface DeviceLocationVerificationContent
 */
export interface DeviceLocationVerificationContent {
    /**
     * 
     * @type {NetworkIdentifier}
     * @memberof DeviceLocationVerificationContent
     */
    'networkIdentifier'?: NetworkIdentifier;
    /**
     * 
     * @type {number}
     * @memberof DeviceLocationVerificationContent
     */
    'latitude'?: number;
    /**
     * 
     * @type {number}
     * @memberof DeviceLocationVerificationContent
     */
    'longitude'?: number;
    /**
     * 
     * @type {number}
     * @memberof DeviceLocationVerificationContent
     */
    'accuracy'?: number;
    /**
     * 
     * @type {LocationDevice}
     * @memberof DeviceLocationVerificationContent
     */
    'device'?: LocationDevice;
}
/**
 * 
 * @export
 * @interface DeviceLocationVerificationResult
 */
export interface DeviceLocationVerificationResult {
    /**
     * 
     * @type {boolean}
     * @memberof DeviceLocationVerificationResult
     */
    'verificationResult'?: boolean;
}
/**
 * 
 * @export
 * @interface Ipv4Address
 */
export interface Ipv4Address {
    /**
     * 
     * @type {string}
     * @memberof Ipv4Address
     */
    'ipv4'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Ipv4Address
     */
    'port'?: number;
}
/**
 * 
 * @export
 * @interface Ipv6Address
 */
export interface Ipv6Address {
    /**
     * 
     * @type {string}
     * @memberof Ipv6Address
     */
    'ipv6'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Ipv6Address
     */
    'port'?: number;
}
/**
 * 
 * @export
 * @interface LocationDevice
 */
export interface LocationDevice {
    /**
     * 
     * @type {string}
     * @memberof LocationDevice
     */
    'networkAccessIdentifier'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationDevice
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {Ipv4Address}
     * @memberof LocationDevice
     */
    'ipv4Address'?: Ipv4Address;
    /**
     * 
     * @type {Ipv6Address}
     * @memberof LocationDevice
     */
    'ipv6Address'?: Ipv6Address;
}
/**
 * 
 * @export
 * @interface NetworkIdentifier
 */
export interface NetworkIdentifier {
    /**
     * 
     * @type {string}
     * @memberof NetworkIdentifier
     */
    'identifierType'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof NetworkIdentifier
     */
    'identifier'?: string | null;
}
/**
 * 
 * @export
 * @interface NetworkRetrievalResult
 */
export interface NetworkRetrievalResult {
    /**
     * 
     * @type {string}
     * @memberof NetworkRetrievalResult
     */
    'networkCode'?: string | null;
}
/**
 * 
 * @export
 * @interface NumberVerificationContent
 */
export interface NumberVerificationContent {
    /**
     * 
     * @type {NetworkIdentifier}
     * @memberof NumberVerificationContent
     */
    'networkIdentifier'?: NetworkIdentifier;
    /**
     * 
     * @type {string}
     * @memberof NumberVerificationContent
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof NumberVerificationContent
     */
    'redirectUri'?: string | null;
}
/**
 * 
 * @export
 * @interface NumberVerificationResult
 */
export interface NumberVerificationResult {
    /**
     * 
     * @type {boolean}
     * @memberof NumberVerificationResult
     */
    'verificationResult'?: boolean;
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
 * @interface SimSwapRetrievalContent
 */
export interface SimSwapRetrievalContent {
    /**
     * 
     * @type {string}
     * @memberof SimSwapRetrievalContent
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {NetworkIdentifier}
     * @memberof SimSwapRetrievalContent
     */
    'networkIdentifier'?: NetworkIdentifier;
}
/**
 * 
 * @export
 * @interface SimSwapRetrievalResult
 */
export interface SimSwapRetrievalResult {
    /**
     * 
     * @type {string}
     * @memberof SimSwapRetrievalResult
     */
    'date'?: string;
}
/**
 * 
 * @export
 * @interface SimSwapVerificationContent
 */
export interface SimSwapVerificationContent {
    /**
     * 
     * @type {string}
     * @memberof SimSwapVerificationContent
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SimSwapVerificationContent
     */
    'maxAgeHours'?: number;
    /**
     * 
     * @type {NetworkIdentifier}
     * @memberof SimSwapVerificationContent
     */
    'networkIdentifier'?: NetworkIdentifier;
}
/**
 * 
 * @export
 * @interface SimSwapVerificationResult
 */
export interface SimSwapVerificationResult {
    /**
     * 
     * @type {boolean}
     * @memberof SimSwapVerificationResult
     */
    'verificationResult'?: boolean;
}
/**
 * 
 * @export
 * @interface TokenResponse
 */
export interface TokenResponse {
    /**
     * 
     * @type {string}
     * @memberof TokenResponse
     */
    'token'?: string | null;
}

/**
 * APCApi - axios parameter creator
 * @export
 */
export const APCApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {DeviceLocationVerificationContent} [deviceLocationVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCDeviceLocationLocationverifyPost: async (deviceLocationVerificationContent?: DeviceLocationVerificationContent, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/device-location/location:verify`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(deviceLocationVerificationContent, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {NetworkIdentifier} [networkIdentifier] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCDeviceNetworkNetworkretrievePost: async (networkIdentifier?: NetworkIdentifier, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/device-network/network:retrieve`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(networkIdentifier, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [apcCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCNumberVerificationApcauthcallbackGet: async (apcCode?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/number-verification/apcauthcallback`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (apcCode !== undefined) {
                localVarQueryParameter['apcCode'] = apcCode;
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
         * @param {NumberVerificationContent} [numberVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCNumberVerificationNumberverifyPost: async (numberVerificationContent?: NumberVerificationContent, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/number-verification/number:verify`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(numberVerificationContent, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SimSwapRetrievalContent} [simSwapRetrievalContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCSimSwapSimSwapretrievePost: async (simSwapRetrievalContent?: SimSwapRetrievalContent, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/sim-swap/sim-swap:retrieve`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(simSwapRetrievalContent, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SimSwapVerificationContent} [simSwapVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCSimSwapSimSwapverifyPost: async (simSwapVerificationContent?: SimSwapVerificationContent, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/APC/sim-swap/sim-swap:verify`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(simSwapVerificationContent, localVarRequestOptions, configuration)

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
         * @param {DeviceLocationVerificationContent} [deviceLocationVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent?: DeviceLocationVerificationContent, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeviceLocationVerificationResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCDeviceLocationLocationverifyPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {NetworkIdentifier} [networkIdentifier] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier?: NetworkIdentifier, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NetworkRetrievalResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCDeviceNetworkNetworkretrievePost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {string} [apcCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCNumberVerificationApcauthcallbackGet(apcCode?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NumberVerificationResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCNumberVerificationApcauthcallbackGet(apcCode, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCNumberVerificationApcauthcallbackGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {NumberVerificationContent} [numberVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCNumberVerificationNumberverifyPost(numberVerificationContent?: NumberVerificationContent, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NumberVerificationResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCNumberVerificationNumberverifyPost(numberVerificationContent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCNumberVerificationNumberverifyPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {SimSwapRetrievalContent} [simSwapRetrievalContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent?: SimSwapRetrievalContent, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SimSwapRetrievalResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCSimSwapSimSwapretrievePost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {SimSwapVerificationContent} [simSwapVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent?: SimSwapVerificationContent, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SimSwapVerificationResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['APCApi.apiAPCSimSwapSimSwapverifyPost']?.[index]?.url;
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
         * @param {DeviceLocationVerificationContent} [deviceLocationVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent?: DeviceLocationVerificationContent, options?: any): AxiosPromise<DeviceLocationVerificationResult> {
            return localVarFp.apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {NetworkIdentifier} [networkIdentifier] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier?: NetworkIdentifier, options?: any): AxiosPromise<NetworkRetrievalResult> {
            return localVarFp.apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [apcCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCNumberVerificationApcauthcallbackGet(apcCode?: string, options?: any): AxiosPromise<NumberVerificationResult> {
            return localVarFp.apiAPCNumberVerificationApcauthcallbackGet(apcCode, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {NumberVerificationContent} [numberVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCNumberVerificationNumberverifyPost(numberVerificationContent?: NumberVerificationContent, options?: any): AxiosPromise<NumberVerificationResult> {
            return localVarFp.apiAPCNumberVerificationNumberverifyPost(numberVerificationContent, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SimSwapRetrievalContent} [simSwapRetrievalContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent?: SimSwapRetrievalContent, options?: any): AxiosPromise<SimSwapRetrievalResult> {
            return localVarFp.apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SimSwapVerificationContent} [simSwapVerificationContent] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent?: SimSwapVerificationContent, options?: any): AxiosPromise<SimSwapVerificationResult> {
            return localVarFp.apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent, options).then((request) => request(axios, basePath));
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
     * @param {DeviceLocationVerificationContent} [deviceLocationVerificationContent] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent?: DeviceLocationVerificationContent, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCDeviceLocationLocationverifyPost(deviceLocationVerificationContent, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {NetworkIdentifier} [networkIdentifier] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier?: NetworkIdentifier, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCDeviceNetworkNetworkretrievePost(networkIdentifier, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [apcCode] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCNumberVerificationApcauthcallbackGet(apcCode?: string, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCNumberVerificationApcauthcallbackGet(apcCode, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {NumberVerificationContent} [numberVerificationContent] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCNumberVerificationNumberverifyPost(numberVerificationContent?: NumberVerificationContent, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCNumberVerificationNumberverifyPost(numberVerificationContent, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SimSwapRetrievalContent} [simSwapRetrievalContent] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent?: SimSwapRetrievalContent, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCSimSwapSimSwapretrievePost(simSwapRetrievalContent, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SimSwapVerificationContent} [simSwapVerificationContent] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof APCApi
     */
    public apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent?: SimSwapVerificationContent, options?: RawAxiosRequestConfig) {
        return APCApiFp(this.configuration).apiAPCSimSwapSimSwapverifyPost(simSwapVerificationContent, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthTokenGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Auth/token`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAuthTokenGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TokenResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAuthTokenGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AuthApi.apiAuthTokenGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthTokenGet(options?: any): AxiosPromise<TokenResponse> {
            return localVarFp.apiAuthTokenGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public apiAuthTokenGet(options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).apiAuthTokenGet(options).then((request) => request(this.axios, this.basePath));
    }
}




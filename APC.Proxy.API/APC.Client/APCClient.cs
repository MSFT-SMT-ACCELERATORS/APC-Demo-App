﻿using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Net.Http;

namespace APC.Client
{
    public class APCClient : IAPCClient
    {
        private readonly IConfidentialClientApplication _authApp;
        private readonly HttpClient _httpClient;
        private readonly APCClientSettings _settings;

        public APCClient(IHttpClientFactory httpClientFactory, IOptions<APCClientSettings> settings)
        {
            _httpClient = httpClientFactory.CreateClient("NoRedirectClient");
            _settings = settings.Value;

            // Configure httpClient with APC API settings
            _httpClient.BaseAddress = new Uri(settings.Value.BaseUri);
            _httpClient.DefaultRequestHeaders.Add("apc-gateway-id", _settings.GatewayId);

            // Configuration to retrieve Entra ID authentication tokens for Application accessing the APC Gateway
            _authApp = ConfidentialClientApplicationBuilder.Create(settings.Value.AuthAppCredentials.ClientId)
                .WithClientSecret(settings.Value.AuthAppCredentials.ClientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{settings.Value.AuthAppCredentials.TenantId}/"))
                .Build();
        }

        public async Task<string> GetAccessTokenAsync()
        {
            string[] scopes = new[] { "https://management.azure.com//.default" };
            var result = await _authApp.AcquireTokenForClient(scopes).ExecuteAsync();
            return result.AccessToken;
        }

        public async Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent request)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.DeviceLocationVerify, request);

        public async Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier request)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.DeviceNetworkRetrieve, request);

        public async Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent request)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.SimSwapRetrieve, request);

        public async Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent request)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.SimSwapVerify, request);

        public async Task<HttpResponseMessage> NumberVerificationCallbackVerifyAsync(NumberVerificationCallbackResult request)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.NumberVerificationVerify, request);

        public async Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationContent request)
        {
            request.RedirectUri = _settings.NumberVerificationRedirectUri;
            return await CallApcApiAsync(HttpMethod.Post, APCPaths.NumberVerificationVerify, request);
        }

        private async Task<HttpResponseMessage> CallApcApiAsync(HttpMethod httpMethod, string endpoint, object? requestContent = null)
        {
            var accessToken = await GetAccessTokenAsync();
            var request = new HttpRequestMessage(httpMethod, endpoint)
            {
                Content = requestContent != null ? JsonContent.Create(requestContent) : null
            };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Add("x-ms-client-request-id", Guid.NewGuid().ToString());

            // Use HttpCompletionOption.ResponseHeadersRead for HTTP 302
            var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

            return response;
        }

    }
}
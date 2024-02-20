using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Text.Json;

namespace APC.Client
{
    public class APCClient : IAPCClient
    {
        private readonly IConfidentialClientApplication _authApp;
        private readonly HttpClient _httpClient;
        private readonly APCClientSettings _settings;
        private readonly IAPCMockService _mockService;
        private readonly bool _isMockEnabled;

        public APCClient(IHttpClientFactory httpClientFactory, IOptions<APCClientSettings> settings, IAPCMockService mockService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _settings = settings.Value;
            _mockService = mockService;
            _isMockEnabled = settings.Value.IsMockEnabled;

            // Configure httpClient with APC API settings
            _httpClient.BaseAddress = new Uri(settings.Value.BaseUri);
            _httpClient.DefaultRequestHeaders.Add("apc-gateway-id", _settings.GatewayId);

            // Configuration to retrieve Entra ID authentication tokens for Application accessing the APC Gateway
            _authApp = ConfidentialClientApplicationBuilder.Create(settings.Value.AuthAppCredentials.ClientId)
                .WithClientSecret(settings.Value.AuthAppCredentials.ClientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{settings.Value.AuthAppCredentials.TenantId}/"))
                .Build();
        }

        public async Task<HttpResponseMessage> CallApcApiAsync(HttpMethod httpMethod, string endpoint, object? requestContent = null, bool useMock = false)
        {
            if (_settings.IsMockEnabled || useMock)
            {
                var mockResult = await _mockService.RetrieveMockResultAsync(endpoint);
                var mockResponse = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(JsonSerializer.Serialize(mockResult), Encoding.UTF8, "application/json")
                };
                return mockResponse;
            }

            var accessToken = await GetAccessTokenAsync();
            var request = new HttpRequestMessage(httpMethod, endpoint)
            {
                Content = requestContent != null ? JsonContent.Create(requestContent) : null
            };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Add("x-ms-client-request-id", Guid.NewGuid().ToString());

            var response = await _httpClient.SendAsync(request);

            return response;
        }

        public async Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.DeviceLocationVerify, request, useMock);

        public async Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.DeviceNetworkRetrieve, request, useMock);

        public async Task<HttpResponseMessage> NumberVerificationRetrieveAsync(NetworkIdentifier request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.NumberVerificationRetrieve, request, useMock);

        public async Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationContent request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.NumberVerificationVerify, request, useMock);

        public async Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.SimSwapRetrieve, request, useMock);

        public async Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent request, bool useMock = false)
            => await CallApcApiAsync(HttpMethod.Post, APCPaths.SimSwapVerify, request, useMock);
    }
}
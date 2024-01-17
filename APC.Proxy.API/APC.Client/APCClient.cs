using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace APC.Client
{
    public class APCClient
    {
        private readonly HttpClient _httpClient;
        private readonly APCClientSettings _settings;
        private readonly IAPCMockService _mockService;
        private readonly bool _isMockEnabled;

        public APCClient(HttpClient httpClient, IOptions<APCClientSettings> settings, IAPCMockService mockService)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
            _mockService = mockService;
            _isMockEnabled = settings.Value.IsMockEnabled;
        }

        private void PrepareRequestHeaders(HttpRequestMessage requestMessage)
        {
            requestMessage.Headers.Add("X-ApcAccessKey", _settings.APCAccessKey);
            requestMessage.Headers.Add("X-ApcAppId", _settings.APCAppId);
            if (!string.IsNullOrEmpty(_settings.Correlator))
            {
                requestMessage.Headers.Add("X-Correlator", _settings.Correlator);;
            }
        }

        public async Task<VerifyLocationResponse> VerifyLocationAsync(VerifyLocationRequest request)
        {
            if (_isMockEnabled)
                return await _mockService.VerifyLocationAsync(request);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "verify-device-location")
            {
                Content = JsonContent.Create(request)
            };

            PrepareRequestHeaders(requestMessage);

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<VerifyLocationResponse>();
        }

        public async Task<LocationResponse> RetrieveLocationAsync(LocationRequest request)
        {
            if (_isMockEnabled)
                return await _mockService.RetrieveLocationAsync(request);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "device-location")
            {
                Content = JsonContent.Create(request)
            };

            PrepareRequestHeaders(requestMessage);

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<LocationResponse>();
        }
    }
}

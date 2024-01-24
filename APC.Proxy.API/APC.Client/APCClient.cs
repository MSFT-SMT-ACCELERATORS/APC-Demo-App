using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace APC.Client
{
    public class APCClient: IAPCClient
    {
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
            _httpClient.BaseAddress = new Uri(settings.Value.APCBaseUri);
            _httpClient.DefaultRequestHeaders.Add("X-ApcAccessKey", _settings.APCAccessKey);
            _httpClient.DefaultRequestHeaders.Add("X-ApcAppId", _settings.APCAppId);
        }


        public async Task<VerifyLocationResponse> VerifyLocationAsync(VerifyLocationRequest request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.VerifyLocationAsync(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "verify-device-location")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<VerifyLocationResponse>();
        }

        public async Task<LocationResponse> RetrieveLocationAsync(LocationRequest request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.RetrieveLocationAsync(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "device-location")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<LocationResponse>();
        }

        public async Task<NumberVerificationMatchResponse> VerifyPhoneNumberAsync(NumberVerificationRequest request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.VerifyPhoneNumber(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "verify")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<NumberVerificationMatchResponse>();
        }

        public async Task<NumberRetrieveResponse> RetrievePhoneNumberAsync(NumberRetrieveRequest request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.RetrievePhoneNumber(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "phone-number")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<NumberRetrieveResponse>();
        }

        public async Task<SimSwapInfo> RetrieveSimSwapDateAsync(CreateSimSwapDate request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.RetrieveSimSwapDate(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "swap-date")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<SimSwapInfo>();
        }

        public async Task<CheckSimSwapInfo> CheckSimSwapAsync(CreateCheckSimSwap request, bool useMock = false)
        {
            if (_isMockEnabled || useMock)
                return await _mockService.CheckSimSwap(request);

            // requestMessage.Headers.Add("X-Correlator", correlator);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "check-swap")
            {
                Content = JsonContent.Create(request)
            };

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<CheckSimSwapInfo>();
        }
    }
}

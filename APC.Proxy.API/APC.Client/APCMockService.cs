using APC.DataModel;
using Microsoft.Extensions.Options;

namespace APC.Client
{
    public class APCMockService : IAPCMockService
    {
        private readonly APCMockSettings _settings;

        public APCMockService(IOptions<APCMockSettings> settings)
        {
            _settings = settings.Value;
        }

        public Task<VerifyLocationResponse> VerifyLocationAsync(VerifyLocationRequest request)
        {
            return Task.FromResult(_settings.MockVerifyLocationResponse);
        }

        public Task<LocationResponse> RetrieveLocationAsync(LocationRequest request)
        {
            return Task.FromResult(_settings.MockLocationResponse);
        }

        public Task<NumberVerificationMatchResponse> VerifyPhoneNumber(NumberVerificationRequest request)
        {
            return Task.FromResult(_settings.MockNumberVerificationMatchResponse);
        }

        public Task<NumberRetrieveResponse> RetrievePhoneNumber(NumberRetrieveRequest request)
        {
            return Task.FromResult(_settings.MockNumberRetrieveResponse);
        }

        public Task<SimSwapInfo> RetrieveSimSwapDate(CreateSimSwapDate request)
        {
            return Task.FromResult(_settings.MockSimSwapInfo);
        }

        public Task<CheckSimSwapInfo> CheckSimSwap(CreateCheckSimSwap request)
        {
            return Task.FromResult(_settings.MockCheckSimSwapInfo);
        }
    }
}

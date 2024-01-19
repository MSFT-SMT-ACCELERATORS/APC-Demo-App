﻿using APC.DataModel;
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
    }
}

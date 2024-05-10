using APC.Client;
using APC.DataModel;
using Microsoft.Extensions.Options;

public class APCMockService : IAPCMockService
{
    private readonly APCMockSettings _settings;

    public APCMockService(IOptions<APCMockSettings> settings)
    {
        _settings = settings.Value;
    }

    public Task<object> RetrieveMockResultAsync(string apcPath)
    {
        return apcPath switch
        {
            APCPaths.DeviceLocationVerify => Task.FromResult<object>(_settings.MockDeviceLocationVerificationResult),
            APCPaths.DeviceNetworkRetrieve => Task.FromResult<object>(_settings.MockNetworkRetrievalResult),
            APCPaths.NumberVerificationVerify => Task.FromResult<object>(_settings.MockNumberVerificationResult),
            APCPaths.SimSwapRetrieve => Task.FromResult<object>(_settings.MockSimSwapRetrievalResult),
            APCPaths.SimSwapVerify => Task.FromResult<object>(_settings.MockSimSwapVerificationResult),
            _ => throw new NotImplementedException($"Mock data not implemented for action: {apcPath}")
        };
    }

    public Task<DeviceLocationVerificationResult> DeviceLocationVerifyAsync(DeviceLocationVerificationContent? request = null)
        => Task.FromResult(_settings.MockDeviceLocationVerificationResult);

    public Task<NetworkRetrievalResult> DeviceNetworkRetrieveAsync(NetworkIdentifier? request = null)
        => Task.FromResult(_settings.MockNetworkRetrievalResult);

    public Task<NumberVerificationResult> NumberVerificationVerifyAsync(NumberVerificationWithoutCodeContent? request = null)
        => Task.FromResult(_settings.MockNumberVerificationResult);

    public Task<SimSwapRetrievalResult> SimSwapRetrieveAsync(SimSwapRetrievalContent? request = null)
        => Task.FromResult(_settings.MockSimSwapRetrievalResult);

    public Task<SimSwapVerificationResult> SimSwapVerifyAsync(SimSwapVerificationContent? request = null)
        => Task.FromResult(_settings.MockSimSwapVerificationResult);
}

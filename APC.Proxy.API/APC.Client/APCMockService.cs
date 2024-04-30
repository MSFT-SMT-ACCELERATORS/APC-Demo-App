using APC.Client;
using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text;
using System.Xml;

public class APCMockService : IAPCClient
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
            APCPaths.NumberVerificationRetrieve => Task.FromResult<object>(_settings.MockNumberRetrievalResult),
            APCPaths.NumberVerificationVerify => Task.FromResult<object>(_settings.MockNumberVerificationResult),
            APCPaths.SimSwapRetrieve => Task.FromResult<object>(_settings.MockSimSwapRetrievalResult),
            APCPaths.SimSwapVerify => Task.FromResult<object>(_settings.MockSimSwapVerificationResult),
            _ => throw new NotImplementedException($"Mock data not implemented for action: {apcPath}")
        };
    }

    public Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockDeviceLocationVerificationResult), Encoding.UTF8, "application/json")
        });

    public Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockNetworkRetrievalResult), Encoding.UTF8, "application/json")
        });
    public Task<HttpResponseMessage> NumberVerificationRetrieveAsync(NetworkIdentifier? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockNumberRetrievalResult), Encoding.UTF8, "application/json")
        });
    public Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationContent? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockNumberVerificationResult), Encoding.UTF8, "application/json")
        });
    public Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockSimSwapRetrievalResult), Encoding.UTF8, "application/json")
        });
    public Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent? request = null)
        => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(_settings.MockSimSwapVerificationResult), Encoding.UTF8, "application/json")
        });
}

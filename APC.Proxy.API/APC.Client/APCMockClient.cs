using APC.Client;
using APC.DataModel;
using Microsoft.Extensions.Options;
using System.Net;
using System.Text.Json;

public class APCMockClient : IAPCClient
{
    private readonly APCMockSettings _settings;

    public APCMockClient(IOptions<APCMockSettings> settings)
    {
        _settings = settings.Value;
    }

    private Task<HttpResponseMessage> CreateMockResponseAsync<T>(T result)
    {
        HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(result), System.Text.Encoding.UTF8, "application/json")
        };
        return Task.FromResult(response);
    }

    Task<HttpResponseMessage> IAPCClient.DeviceLocationVerifyAsync(DeviceLocationVerificationContent request)
        => CreateMockResponseAsync(_settings.MockDeviceLocationVerificationResult);
    Task<HttpResponseMessage> IAPCClient.DeviceNetworkRetrieveAsync(NetworkIdentifier request)
        => CreateMockResponseAsync(_settings.MockNetworkRetrievalResult);
    Task<HttpResponseMessage> IAPCClient.NumberVerificationVerifyAsync(NumberVerificationWithoutCodeContent request)
        => CreateMockResponseAsync(_settings.MockNumberVerificationResult);
    Task<HttpResponseMessage> IAPCClient.NumberVerificationCallbackVerifyAsync(NumberVerificationWithCodeContent request)
        => CreateMockResponseAsync(_settings.MockNumberCallbackVerificationResult);
    Task<HttpResponseMessage> IAPCClient.SimSwapRetrieveAsync(SimSwapRetrievalContent request)
        => CreateMockResponseAsync(_settings.MockSimSwapRetrievalResult);
    Task<HttpResponseMessage> IAPCClient.SimSwapVerifyAsync(SimSwapVerificationContent request)
        => CreateMockResponseAsync(_settings.MockSimSwapVerificationResult);
}

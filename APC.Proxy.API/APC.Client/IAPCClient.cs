using APC.DataModel;

namespace APC.Client
{
    public interface IAPCClient
    {
        Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent request);
        Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier request);
        Task<HttpResponseMessage> NumberVerificationCallbackVerifyAsync(NumberVerificationCallbackResult request);
        Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationContent request);
        Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent request);
        Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent request);
        Task<string> GetAccessTokenAsync();
    }

}

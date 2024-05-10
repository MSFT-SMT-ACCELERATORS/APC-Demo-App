using APC.DataModel;

namespace APC.Client
{
    public interface IAPCClientDI
    {
        Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent request);
        Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier request);
        Task<HttpResponseMessage> NumberVerificationCallbackVerifyAsync(NumberVerificationWithCodeContent request);
        Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationWithoutCodeContent request);
        Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent request);
        Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent request);
    }
}

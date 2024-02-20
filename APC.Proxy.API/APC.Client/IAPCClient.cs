using APC.DataModel;

namespace APC.Client
{
    public interface IAPCClient
    {
        Task<HttpResponseMessage> DeviceLocationVerifyAsync(DeviceLocationVerificationContent request, bool useMock = false);
        Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(NetworkIdentifier request, bool useMock = false);
        Task<HttpResponseMessage> NumberVerificationRetrieveAsync(NetworkIdentifier request, bool useMock = false);
        Task<HttpResponseMessage> NumberVerificationVerifyAsync(NumberVerificationContent request, bool useMock = false);
        Task<HttpResponseMessage> SimSwapRetrieveAsync(SimSwapRetrievalContent request, bool useMock = false);
        Task<HttpResponseMessage> SimSwapVerifyAsync(SimSwapVerificationContent request, bool useMock = false);
    }

}

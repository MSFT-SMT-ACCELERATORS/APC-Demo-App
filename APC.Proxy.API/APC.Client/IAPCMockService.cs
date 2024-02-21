using APC.DataModel;

namespace APC.Client
{
    public interface IAPCMockService
    {
        Task<object> RetrieveMockResultAsync(string apcPath);
        Task<DeviceLocationVerificationResult> DeviceLocationVerifyAsync(DeviceLocationVerificationContent? request = null);
        Task<NetworkRetrievalResult> DeviceNetworkRetrieveAsync(NetworkIdentifier? request = null);
        Task<NumberVerificationResult> NumberVerificationVerifyAsync(NumberVerificationContent? request = null);
        Task<SimSwapRetrievalResult> SimSwapRetrieveAsync(SimSwapRetrievalContent? request = null);
        Task<SimSwapVerificationResult> SimSwapVerifyAsync(SimSwapVerificationContent? request = null);
    }
}

using APC.DataModel;

namespace APC.Client
{
    public class APCMockSettings
    {
        public DeviceLocationVerificationResult MockDeviceLocationVerificationResult { get; set; } = new DeviceLocationVerificationResult
        {
            VerificationResult = true
        };
        public NetworkRetrievalResult MockNetworkRetrievalResult { get; set; } = new NetworkRetrievalResult
        {
            NetworkCode = "Telefonica_Spain"
        };
        public NumberVerificationResult MockNumberVerificationResult { get; set; } = new NumberVerificationResult
        {
            VerificationResult = true
        };
        public NumberVerificationCallbackResult MockNumberCallbackVerificationResult { get; set; } = new NumberVerificationCallbackResult
        {
            ApcCode = "1234"
        };
        public SimSwapRetrievalResult MockSimSwapRetrievalResult { get; set; } = new SimSwapRetrievalResult
        {
            Date = DateTime.UtcNow.AddDays(-8)
        };
        public SimSwapVerificationResult MockSimSwapVerificationResult { get; set; } = new SimSwapVerificationResult
        {
            VerificationResult = true
        };
    }
}

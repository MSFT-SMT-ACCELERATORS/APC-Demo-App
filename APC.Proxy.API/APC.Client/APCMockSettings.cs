using APC.DataModel;

namespace APC.Client
{
    public class APCMockSettings
    {
        public VerifyLocationResponse MockVerifyLocationResponse { get; set; } = new VerifyLocationResponse
        {
            LastLocationTime = DateTime.UtcNow,
            VerificationResult = true,
            MatchRate = 80
        };
        public LocationResponse MockLocationResponse { get; set; } = new LocationResponse
        {
            LastLocationTime = DateTime.UtcNow,
            LocationArea = new LocationArea
            {
                AreaType = "Circle",
                Circle = new Circle
                {
                    Latitude = 51.5074,
                    Longitude = -0.1278,
                    Radius = 1000 
                }
            }
        };
        public NumberVerificationMatchResponse MockNumberVerificationMatchResponse { get; set; } = new NumberVerificationMatchResponse
        {
            DevicePhoneNumberVerified = true
        };
        public NumberRetrieveResponse MockNumberRetrieveResponse { get; set; } = new NumberRetrieveResponse
        {
            DevicePhoneNumber = "+1234567890"
        };
    }

}

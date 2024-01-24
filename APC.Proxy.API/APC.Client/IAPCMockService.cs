using APC.DataModel;

namespace APC.Client
{
    public interface IAPCMockService
    {
        Task<VerifyLocationResponse> VerifyLocationAsync(VerifyLocationRequest request);
        Task<LocationResponse> RetrieveLocationAsync(LocationRequest request);
        Task<NumberVerificationMatchResponse> VerifyPhoneNumber(NumberVerificationRequest request);
        Task<NumberRetrieveResponse> RetrievePhoneNumber(NumberRetrieveRequest request);
    }

}

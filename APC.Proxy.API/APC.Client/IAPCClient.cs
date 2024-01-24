using APC.DataModel;

namespace APC.Client
{
    public interface IAPCClient
    {
        Task<VerifyLocationResponse> VerifyLocationAsync(VerifyLocationRequest request, bool useMock = false);
        Task<LocationResponse> RetrieveLocationAsync(LocationRequest request, bool useMock = false);
        Task<NumberVerificationMatchResponse> VerifyPhoneNumberAsync(NumberVerificationRequest request, bool useMock = false);
        Task<NumberRetrieveResponse> RetrievePhoneNumberAsync(NumberRetrieveRequest request, bool useMock = false);
    }

}

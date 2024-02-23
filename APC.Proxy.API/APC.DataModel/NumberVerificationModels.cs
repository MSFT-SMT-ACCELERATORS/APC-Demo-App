namespace APC.DataModel
{
    public class NumberVerificationCallbackResult
    {
        public required string ApcCode { get; set; }
    }

    public class NumberVerificationContent
    {
        public required NetworkIdentifier NetworkIdentifier { get; set; }
        public required string PhoneNumber { get; set; }
        // public string? HashedPhoneNumber { get; set; }
        public required string RedirectUri { get; set; }
    }

    public class NumberVerificationResult
    {
        public bool VerificationResult { get; set; }
    }

}

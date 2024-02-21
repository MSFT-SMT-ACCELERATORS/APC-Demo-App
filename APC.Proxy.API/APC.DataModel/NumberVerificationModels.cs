namespace APC.DataModel
{
    public class NumberRetrievalResult
    {
        public string PhoneNumber { get; set; }
    }

    public class NumberVerificationContent
    {
        public NetworkIdentifier NetworkIdentifier { get; set; }
        public string PhoneNumber { get; set; }
        public string HashedPhoneNumber { get; set; }
    }

    public class NumberVerificationResult
    {
        public bool VerificationResult { get; set; }
    }

}

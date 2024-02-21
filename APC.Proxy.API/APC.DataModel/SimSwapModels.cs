using System.ComponentModel.DataAnnotations;

namespace APC.DataModel
{
    public class SimSwapRetrievalContent
    {
        public string PhoneNumber { get; set; }
        public NetworkIdentifier NetworkIdentifier { get; set; }
    }

    public class SimSwapRetrievalResult
    {
        public DateTime Date { get; set; }
    }

    public class SimSwapVerificationContent
    {
        public string PhoneNumber { get; set; }
        public int MaxAgeHours { get; set; }
        public NetworkIdentifier NetworkIdentifier { get; set; }
    }

    public class SimSwapVerificationResult
    {
        public bool VerificationResult { get; set; }
    }


}

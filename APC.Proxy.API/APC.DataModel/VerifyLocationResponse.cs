namespace APC.DataModel
{
    public class VerifyLocationResponse
    {
        public DateTime LastLocationTime { get; set; }
        public bool VerificationResult { get; set; }
        public int? MatchRate { get; set; }
    }
}

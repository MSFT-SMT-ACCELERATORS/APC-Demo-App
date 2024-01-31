namespace APC.DataModel
{
    public class SimSwapInfo
    {
        public DateTime LatestSimChange { get; set; }
    }

    public class CheckSimSwapInfo
    {
        public bool Swapped { get; set; }
    }

    public class ErrorInfo
    {
        public int Status { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
    }

    public class CreateCheckSimSwap
    {
        public string PhoneNumber { get; set; }
        public string Network { get; set; }
        public int MaxAge { get; set; }
    }

    public class CreateSimSwapDate
    {
        public string PhoneNumber { get; set; }
        public string Network { get; set; }
    }

    public class Network
    {
        public string NetworkId { get; set; }
    }

}

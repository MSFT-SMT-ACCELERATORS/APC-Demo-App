namespace APC.DataModel
{
    public class DeviceLocationVerificationContent
    {
        public NetworkIdentifier NetworkIdentifier { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Accuracy { get; set; }
        public LocationDevice LocationDevice { get; set; }
    }

    public class DeviceLocationVerificationResult
    {
        public bool VerificationResult { get; set; }
    }

    public class LocationDevice
    {
        public string NetworkAccessIdentifier { get; set; }
        public string PhoneNumber { get; set; }
        public Ipv4Address Ipv4Address { get; set; }
        public Ipv6Address Ipv6Address { get; set; }
    }

}

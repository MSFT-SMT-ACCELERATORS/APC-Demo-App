namespace APC.DataModel
{
    public class DeviceId
    {
        public string PhoneNumber { get; set; }
        public string NetworkAccessIdentifier { get; set; }
        public string Ipv4Address { get; set; }
        public string Ipv6Address { get; set; }
    }

    public class DeviceNumber
    {
        public string PhoneNumber { get; set; }
        public string HashedPhoneNumber { get; set; }
    }

    public class DeviceIpv4Addr
    {
        public string PublicAddress { get; set; }
        public string PrivateAddress { get; set; }
        public int? PublicPort { get; set; }
    }
}

namespace APC.DataModel
{
    public class Ipv4Address
    {
        public required string Ipv4 { get; set; }
        public int Port { get; set; }
    }

    public class Ipv6Address
    {
        public required string Ipv6 { get; set; }
        public int Port { get; set; }
    }

}

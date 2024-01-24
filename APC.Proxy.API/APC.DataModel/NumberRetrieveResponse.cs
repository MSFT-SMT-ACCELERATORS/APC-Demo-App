namespace APC.DataModel
{
    public class NumberRetrieveRequest
    {
        public string NetworkID { get; set; }
        public DeviceId DeviceId { get; set; }
    }

    public class NumberRetrieveResponse
    {
        public string DevicePhoneNumber { get; set; }
    }
}

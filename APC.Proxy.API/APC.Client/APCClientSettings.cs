namespace APC.Client
{
    public class APCClientSettings
    {
        public required string APCAccessKey { get; set; }
        public required string APCAppId { get; set; }
        public required string APCBaseUri { get; set; }
        public required string Correlator { get; set; }
    }

}

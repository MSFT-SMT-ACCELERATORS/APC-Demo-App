namespace APC.Client
{
    public class APCClientSettings
    {
        public required AuthAppCredentials AuthAppCredentials { get; set; }
        public required string GatewayId { get; set; }
        public required string BaseUri { get; set; }
        public bool IsMockEnabled { get; set; }
        public bool ForwardApiErrors { get; set; } = false;

    }

    public class AuthAppCredentials
    {
        public required string ClientId { get; set; }
        public required string ClientSecret { get; set; }
        public required string TenantId { get; set; }

    }
}

namespace APC.DataModel
{
    public class NetworkIdentifier
    {
        public required string IdentifierType { get; set; }
        public required string Identifier { get; set; }
    }

    public class NetworkRetrievalResult
    {
        public required string NetworkCode { get; set; }
    }

}

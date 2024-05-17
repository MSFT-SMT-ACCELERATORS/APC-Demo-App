namespace APC.DataModel
{
    public class ErrorInfo
    {
        public int Status { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public string Target { get; set; }
        public List<ErrorDetail> Details { get; set; }
        public InnerError Innererror { get; set; }
        public string ConsentUrl { get; set; }
    }

    public class ErrorDetail
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public string Target { get; set; }
    }

    public class InnerError
    {
        public string Code { get; set; }
        public InnerError Innererror { get; set; }
    }

}

using System.ComponentModel.DataAnnotations;

namespace APC.DataModel
{
    public class NumberVerificationRequest
    {
        public DeviceNumber DeviceNumber { get; set; }
        public string NetworkID { get; set; }
        public DeviceId DeviceId { get; set; }
    }

    public class NumberVerificationMatchResponse
    {
        public bool DevicePhoneNumberVerified { get; set; }
    }

}

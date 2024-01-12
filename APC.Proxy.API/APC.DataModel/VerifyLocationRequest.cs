using System.ComponentModel.DataAnnotations;

namespace APC.DataModel
{
    public class VerifyLocationRequest
    {
        [Required]
        public DeviceId DeviceId { get; set; }

        [Required]
        public string NetworkId { get; set; }

        [Required]
        public LocationArea LocationArea { get; set; }

        public int MaxAge { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APC.Client
{
    public static class APCPaths
    {
        public const string DeviceLocationVerify = "/device-location/location:verify";
        public const string DeviceNetworkRetrieve = "/device-network/network:retrieve";
        public const string NumberVerificationVerify = "/number-verification/number:verify";
        public const string SimSwapRetrieve = "/sim-swap/sim-swap:retrieve";
        public const string SimSwapVerify = "/sim-swap/sim-swap:verify";
    }
}

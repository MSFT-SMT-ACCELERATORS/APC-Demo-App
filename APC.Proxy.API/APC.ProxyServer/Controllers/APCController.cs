using APC.Client;
using APC.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace APC.ProxyServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class APCController : ControllerBase
    {
        private readonly ILogger<APCController> _logger;
        private readonly IAPCClient _apcClient;

        public APCController(ILogger<APCController> logger, IAPCClient apcClient)
        {
            _logger = logger;
            _apcClient = apcClient;
        }

        [HttpPost("device-location/location:verify")]
        [ProducesResponseType(typeof(DeviceLocationVerificationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeviceLocationVerify([FromBody] DeviceLocationVerificationContent request)
        {
            return await HandleRequest(
                useMock => _apcClient.DeviceLocationVerifyAsync(request, useMock),
                "Error occurred while verifying device location.");
        }

        [HttpPost("device-network/network:retrieve")]
        [ProducesResponseType(typeof(NetworkRetrievalResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeviceNetworkRetrieve([FromBody] NetworkIdentifier request)
        {
            return await HandleRequest(
                useMock => _apcClient.DeviceNetworkRetrieveAsync(request, useMock),
                "Error occurred while retrieving network.");
        }

        [HttpPost("number-verification/number:retrieve")]
        [ProducesResponseType(typeof(NumberRetrievalResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> NumberVerificationRetrieve([FromBody] NetworkIdentifier request)
        {
            return await HandleRequest(
                useMock => _apcClient.NumberVerificationRetrieveAsync(request, useMock),
                "Error occurred while retrieving phone number.");
        }

        [HttpPost("number-verification/number:verify")]
        [ProducesResponseType(typeof(NumberVerificationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> NumberVerificationVerify([FromBody] NumberVerificationContent request)
        {
            return await HandleRequest(
                useMock => _apcClient.NumberVerificationVerifyAsync(request, useMock),
                "Error occurred while verifying phone number.");
        }

        [HttpPost("sim-swap/sim-swap:retrieve")]
        [ProducesResponseType(typeof(SimSwapRetrievalResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SimSwapRetrieve([FromBody] SimSwapRetrievalContent request)
        {
            return await HandleRequest(
                useMock => _apcClient.SimSwapRetrieveAsync(request, useMock),
                "Error occurred while retrieving SIM swap information.");
        }

        [HttpPost("sim-swap/sim-swap:verify")]
        [ProducesResponseType(typeof(SimSwapVerificationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SimSwapVerify([FromBody] SimSwapVerificationContent request)
        {
            return await HandleRequest(
                useMock => _apcClient.SimSwapVerifyAsync(request, useMock),
                "Error occurred while verifying SIM swap.");
        }


        private async Task<IActionResult> HandleRequest(
            Func<bool, Task<HttpResponseMessage>> action,
            string errorMessage)
        {
            try
            {
                var useMock = HttpContext.Request.Headers.TryGetValue("X-Use-Mock", out var useMockValue)
                    ? string.Equals(useMockValue, "true", StringComparison.OrdinalIgnoreCase)
                    : false;

                var responseMessage = await action(useMock);

                if (!responseMessage.IsSuccessStatusCode)
                {
                    var errorContent = await responseMessage.Content.ReadAsStringAsync();
                    return StatusCode((int)responseMessage.StatusCode, errorContent);
                }

                var content = await responseMessage.Content.ReadAsStringAsync();
                return Content(content, "application/json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, $"APC Proxy Internal Server Error: {errorMessage}");
            }
        }

    }
}

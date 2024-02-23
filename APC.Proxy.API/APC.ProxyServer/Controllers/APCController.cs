using APC.Client;
using APC.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;

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
            if (request.Device.Ipv4Address != null)
            {
                _logger.LogWarning($"Location triggered IP in request: {request.Device.Ipv4Address.Ipv4}, ip caller {Request.HttpContext.Connection.RemoteIpAddress}, port {Request.HttpContext.Connection.RemotePort}");

                request.Device.Ipv4Address.Port = Request.HttpContext.Connection.RemotePort;
                request.Device.Ipv4Address.Ipv4 = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            }

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

        [HttpGet("number-verification/apcauthcallback")]
        [ProducesResponseType(typeof(NumberVerificationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> NumberVerificationRetrieve(string apcCode)
        {
            return await HandleRequest(
                useMock => _apcClient.NumberVerificationCallbackVerifyAsync(new NumberVerificationCallbackResult() { ApcCode = apcCode }, useMock),
                "Error occurred while retrieving phone number.");
        }

        [HttpPost("number-verification/number:verify")]
        [ProducesResponseType(typeof(string), StatusCodes.Status302Found)]
        [ProducesResponseType(typeof(NumberVerificationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

                if (responseMessage.StatusCode == HttpStatusCode.Redirect)
                    //return new OkObjectResult(responseMessage.Headers.Location.ToString());
                    return Redirect(responseMessage.Headers.Location?.ToString());

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

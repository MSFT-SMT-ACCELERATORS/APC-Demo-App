using APC.Client;
using APC.DataModel;
using Microsoft.AspNetCore.Mvc;

namespace APC.ProxyServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APCController : ControllerBase
    {
        private readonly ILogger<APCController> _logger;
        private readonly IAPCClient _apcClient;

        public APCController(ILogger<APCController> logger, IAPCClient apcClient)
        {
            _logger = logger;
            _apcClient = apcClient;
        }

        [HttpGet("test")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult Test(string yourIp)
        {
            return Ok(yourIp);
        }

        [HttpPost("verify-device-location")]
        [ProducesResponseType(typeof(VerifyLocationResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> VerifyDeviceLocation([FromBody] VerifyLocationRequest request)
        {
            return await HandleRequest(
                request,
                _apcClient.VerifyLocationAsync,
                "Error occurred while verifying device location.");
        }

        [HttpPost("device-location")]
        [ProducesResponseType(typeof(LocationResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> RetrieveDeviceLocation([FromBody] LocationRequest request)
        {
            return await HandleRequest(
                request,
                _apcClient.RetrieveLocationAsync,
                "Error occurred while retrieving device location.");
        }

        [HttpPost("verify")]
        [ProducesResponseType(typeof(NumberVerificationMatchResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> VerifyPhoneNumber([FromBody] NumberVerificationRequest request)
        {
            return await HandleRequest(
                request,
                _apcClient.VerifyPhoneNumberAsync,
                "Error occurred while verifying phone number.");
        }

        [HttpGet("phone-number")]
        [ProducesResponseType(typeof(NumberRetrieveResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> RetrievePhoneNumber([FromQuery] NumberRetrieveRequest request)
        {
            return await HandleRequest(
                request,
                _apcClient.RetrievePhoneNumberAsync,
                "Error occurred while retrieving phone number.");
        }

        [HttpPost("swap-date")]
        [ProducesResponseType(typeof(SimSwapInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> RetrieveSimSwapDate([FromBody] CreateSimSwapDate request)
        {
            return await HandleRequest(
                request,
                _apcClient.RetrieveSimSwapDateAsync,
                "Error occurred while retrieving SIM swap date.");
        }

        [HttpPost("check-swap")]
        [ProducesResponseType(typeof(CheckSimSwapInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> CheckSimSwap([FromBody] CreateCheckSimSwap request)
        {
            return await HandleRequest(
                request,
                _apcClient.CheckSimSwapAsync,
                "Error occurred while checking SIM swap.");
        }

        // Generic method to handle common logic
        private async Task<IActionResult> HandleRequest<TRequest, TResponse>(
            TRequest request,
            Func<TRequest, bool, Task<TResponse>> action,
            string errorMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var useMock = HttpContext.Request.Headers.TryGetValue("X-Use-Mock", out var value)
                              && value.ToString().Equals("true", StringComparison.OrdinalIgnoreCase);
                var response = await action(request, useMock);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

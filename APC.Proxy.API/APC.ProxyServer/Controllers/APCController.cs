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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> VerifyDeviceLocation([FromBody] VerifyLocationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var useMock = HttpContext.Request.Headers.TryGetValue("X-Use-Mock", out var value)
                    && value.ToString().Equals("true", StringComparison.OrdinalIgnoreCase);
                var response = await _apcClient.VerifyLocationAsync(request, useMock);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while verifying device location.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("device-location")]
        [ProducesResponseType(typeof(LocationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RetrieveDeviceLocation([FromBody] LocationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var useMock = HttpContext.Request.Headers.TryGetValue("X-Use-Mock", out var value)
                    && value.ToString().Equals("true", StringComparison.OrdinalIgnoreCase);
                var response = await _apcClient.RetrieveLocationAsync(request, useMock);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving device location.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

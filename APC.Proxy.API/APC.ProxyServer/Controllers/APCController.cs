using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using APC.DataModel;
using APC.Client; 

namespace APC.ProxyServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APCController : ControllerBase
    {
        private readonly ILogger<APCController> _logger;
        private readonly APCClient _apcClient;

        public APCController(ILogger<APCController> logger, APCClient apcClient)
        {
            _logger = logger;
            _apcClient = apcClient;
        }

        [HttpGet("test")]
        public IActionResult Test(string yourIp)
        {
            return Ok(yourIp);
        }

        [HttpPost("verify-device-location")]
        public async Task<IActionResult> VerifyDeviceLocation([FromBody] VerifyLocationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _apcClient.VerifyLocationAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while verifying device location.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("device-location")]
        public async Task<IActionResult> RetrieveDeviceLocation([FromBody] LocationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _apcClient.RetrieveLocationAsync(request);
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

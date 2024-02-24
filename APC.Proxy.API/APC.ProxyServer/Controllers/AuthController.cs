using APC.Client;
using APC.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace APC.ProxyServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<APCController> _logger;
        private readonly IAPCClient _apcClient;

        public AuthController(ILogger<APCController> logger, IAPCClient apcClient)
        {
            _logger = logger;
            _apcClient = apcClient;
        }

        [HttpGet("token")]
        public async Task<TokenResponse> GetToken()
        {
            var accessToken = await _apcClient.GetAccessTokenAsync();
            return new TokenResponse() { Token = "Bearer " + accessToken };
        }

        public class TokenResponse {
        
            public required string Token { get; set; }
        }

    }
}

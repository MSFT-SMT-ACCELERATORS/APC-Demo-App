using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Core;
using System.Collections.Generic;

using APC.Demos.Secrets;

// Simple console application to demonstrate API calls to Azure Programmable Connectivity using HTTP REST.
Console.WriteLine("Hello, welcome to this demo on APC Device Location Verification demo using the HTTP REST-APIs.");

// Endpoint and Gateway ID for your APC.
string baseUrl = "https://eastus.prod.apcgatewayapi.azure.com";

// Your APC and Azure Entra application's details.
string apcGatewayId = APCAppSecrets.APCGatewayId;
string clientId = APCAppSecrets.ClientId; //"your-application-client-id";
string clientSecret = APCAppSecrets.ClientSecret; //"your-application-client-secret";
string tenantId = APCAppSecrets.TenantId; // "your-tenant-id";

// Authentication with Azure AD to obtain Bearer Token.
var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
var token = await credential.GetTokenAsync(new Azure.Core.TokenRequestContext(new[] { "https://management.azure.com/.default" }));
string accessToken = token.Token;

// Prepare the HttpClient with the Bearer token and common headers.

// Disable autoredirection for number verification 302 redirects
var handler = new HttpClientHandler
{
    AllowAutoRedirect = false
};

using var httpClient = new HttpClient(handler);
httpClient.BaseAddress = new Uri(baseUrl);
httpClient.DefaultRequestHeaders.Add("apc-gateway-id", apcGatewayId);
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
httpClient.DefaultRequestHeaders.Add("x-ms-client-request-id", Guid.NewGuid().ToString()); // Maybe remove this and mention it in part 2?

// Example: Retrieve network information using a direct HTTP call.
string networkApiUrl = $"{baseUrl}/device-network/network:retrieve";
var networkIdentifier = new
{
    identifierType = "IPv4",
    identifier = APCAppSecrets.SampleTelcoOperatorIP 
};
var networkContent = new StringContent(JsonSerializer.Serialize(networkIdentifier), Encoding.UTF8, "application/json");

HttpResponseMessage networkResponse = await httpClient.PostAsync(networkApiUrl, networkContent);
var networkResult = await JsonSerializer.DeserializeAsync<NetworkRetrievalResult>(await networkResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Network retrieval result: {networkResult.networkCode}");


// Example: Verify device location using a direct HTTP call.
string locationApiUrl = $"{baseUrl}/device-location/location:verify";

//(CDLTLL) Location at FL
var locationContent = new
{
    networkIdentifier = new { identifierType = "NetworkCode", identifier = networkResult.networkCode },
                            latitude = 26.0174,   
                            longitude = -80.3660, 
                            accuracy = 10,
                            device = new { phoneNumber = "+34682335745" }
};
var locationRequestContent = new StringContent(JsonSerializer.Serialize(locationContent), Encoding.UTF8, "application/json");

HttpResponseMessage locationResponse = await httpClient.PostAsync(locationApiUrl, locationRequestContent);
var locationResult = await JsonSerializer.DeserializeAsync<DeviceLocationVerificationResult>(await locationResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Device location verification result: {locationResult.VerificationResult}");

Console.WriteLine("**** End of program execution ****");



// Response model classes
public class NetworkRetrievalResult
{
    public required string networkCode { get; set; }
}
public class SimSwapVerificationResult
{
    public bool VerificationResult { get; set; }
}
public class DeviceLocationVerificationResult
{
    public bool VerificationResult { get; set; }
}


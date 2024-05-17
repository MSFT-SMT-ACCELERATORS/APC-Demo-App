using Azure.Core;
using Azure.Identity;
using Azure;
using Azure.Communication.ProgrammableConnectivity;
using APC.Demos.Secrets;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;


// Simple console application to demonstrate API calls to Azure Programmable Connectivity using APC SDK for .NET/C#.
Console.WriteLine("Hello, welcome to this demo on APC Phone Number Verification demo using the APC SDK for .NET/C#.");

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
httpClient.DefaultRequestHeaders.Add("x-ms-client-request-id", Guid.NewGuid().ToString()); 

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

//////////////////////////////////////////////////////////////////////////////
// Phone Number verification using SDK for C# + HttpClient for redirections

// First Number Verification Request
string numberVerificationInitUrl = $"{baseUrl}/number-verification/number:verify";
var numberVerificationInitContent = new
{
    phoneNumber = "+34123456789",  //Set the phone number to validate
    networkIdentifier = new { identifierType = "NetworkCode", identifier = networkResult.networkCode },
    redirectUri = "https://localhost:7127/api/APC/number-verification/apcauthcallback"
};
var initRequestContent = new StringContent(JsonSerializer.Serialize(numberVerificationInitContent), Encoding.UTF8, "application/json");

// Send the initial request and handle redirects to capture apcCode
HttpResponseMessage initialNumberVerificationResponse = await httpClient.PostAsync(numberVerificationInitUrl, initRequestContent);

// Following redirects manually
string firstRedirectUri = initialNumberVerificationResponse.Headers.Location?.ToString();
HttpResponseMessage firstRedirectResponse = await httpClient.GetAsync(firstRedirectUri);

var secondRedirectUri = firstRedirectResponse.Headers.Location?.ToString();
HttpResponseMessage secondRedirectResponse = await httpClient.GetAsync(secondRedirectUri);

var thirdRedirectUri = secondRedirectResponse.Headers.Location?.ToString();
HttpResponseMessage thirdRedirectResponse = await httpClient.GetAsync(thirdRedirectUri);

var fourthRedirectUri = thirdRedirectResponse.Headers.Location?.ToString();
HttpResponseMessage fourthRedirectResponse = await httpClient.GetAsync(fourthRedirectUri);


if (fourthRedirectResponse.Headers.Location != null)
{
    // Retrieve APC Code
    var finalRedirectUri = fourthRedirectResponse.Headers.Location?.ToString();
    var uri = new Uri(finalRedirectUri);
    var query = System.Web.HttpUtility.ParseQueryString(uri.Query);
    var apcCode = query["apcCode"];
    Console.WriteLine($"Captured APC Code: {apcCode}");

    // Using the apcCode to verify number
    string numberVerificationUrl = $"{baseUrl}/number-verification/number:verify";
    var numberVerificationContent = new
    {
        apcCode = apcCode
    };
    var verifyRequestContent = new StringContent(JsonSerializer.Serialize(numberVerificationContent), Encoding.UTF8, "application/json");

    HttpResponseMessage verificationResponse = await httpClient.PostAsync(numberVerificationUrl, verifyRequestContent);
    var verificationResult = await JsonSerializer.DeserializeAsync<dynamic>(await verificationResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

    Console.WriteLine($"Number verification result: {verificationResult}");
}
else
    Console.WriteLine("API not supported. Make sure you are connected through a cellular network that supports Phone Number Verification API.");

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
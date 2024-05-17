using Azure.Core;
using Azure.Identity;
using Azure;
using Azure.Communication.ProgrammableConnectivity;
using APC.Demos.Secrets;

// Simple console application to demonstrate API calls to Azure Programmable Connectivity using APC SDK for .NET/C#.
Console.WriteLine("Hello, welcome to this demo on APC SIM-Swap detection demo using the APC SDK for .NET/C#.");

// Setup your APC endpoint and gateway ID here.
Uri apcEndpoint = new Uri("https://eastus.prod.apcgatewayapi.azure.com"); // new Uri("https://your-endpoint-here.com");

// Your APC and Azure Entra application's details.
string apcGatewayId = APCAppSecrets.APCGatewayId;
string clientId = APCAppSecrets.ClientId; //"your-application-client-id";
string clientSecret = APCAppSecrets.ClientSecret; //"your-application-client-secret";
string tenantId = APCAppSecrets.TenantId; // "your-tenant-id";

// Instantiate the client credential with your client ID, client secret, and tenant ID.
TokenCredential credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Instantiate the APC client with your endpoint and credential.
ProgrammableConnectivityClient apcClient = new ProgrammableConnectivityClient(apcEndpoint, credential);

// Retrieve network information
var deviceNetworkApcClient = apcClient.GetDeviceNetworkClient();
var networkIdentifier = new NetworkIdentifier("IPv4", APCAppSecrets.SampleTelcoOperatorIP);

Response<NetworkRetrievalResult> networkResponse = deviceNetworkApcClient.Retrieve(apcGatewayId, networkIdentifier);

Console.WriteLine("");
Console.WriteLine(networkResponse.Value.NetworkCode);
Console.WriteLine("");

// SIM swap input data
SimSwapVerificationContent simSwapContent = new SimSwapVerificationContent(new NetworkIdentifier("NetworkCode", networkResponse.Value.NetworkCode))
{
    PhoneNumber = "+34682335745",
    MaxAgeHours = 72  //3 days
};

Response<SimSwapVerificationResult> simSwapResponse =
                        await apcClient.GetSimSwapClient().VerifyAsync(apcGatewayId, simSwapContent);

Console.WriteLine($"Was SIM swapped recently?: {simSwapResponse.Value.VerificationResult}");

Console.WriteLine("**** End of program execution ****");

using Azure.Core;
using Azure.Identity;
using Azure;
using Azure.Communication.ProgrammableConnectivity;
using APC.Demos.Secrets;

// Simple console application to demonstrate API calls to Azure Programmable Connectivity using APC SDK for .NET/C#.
Console.WriteLine("Hello, welcome to this demo on APC Device Location Verification demo using the APC SDK for .NET/C#.");

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


// Verify device location
// Location of Seattle Convention Center Summit
var deviceLocationClient = apcClient.GetDeviceLocationClient();
var deviceLocationVerificationContent = new DeviceLocationVerificationContent(
    new NetworkIdentifier("NetworkCode", networkResponse.Value.NetworkCode),
    latitude: 47.6140,
    longitude: -122.3319,
    accuracy: 10,
    new LocationDevice
    {
        PhoneNumber = "+34682335745",  //Change to your phone number
    });

Response<DeviceLocationVerificationResult> deviceLocationResponse = deviceLocationClient.Verify(apcGatewayId, deviceLocationVerificationContent);
Console.WriteLine($"Device location verification result: {deviceLocationResponse.Value.VerificationResult}");


Console.WriteLine("**** End of program execution ****");
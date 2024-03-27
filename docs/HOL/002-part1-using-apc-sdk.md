# Using APC SDK

## Project Creation and Setup

To start using the Azure Programmable Connectivity (APC) SDK, you'll need to create a new console application. This application will serve as the foundation for integrating with APC services.

### Creating a Console Application

1. Open your IDE or code editor.
2. Create a new .NET 8 console application project.
3. Name your project appropriately to reflect its purpose, such as `APCIntegration`.

   ![Create New Project](imgs/create-new-project.jpg)

### Install the APC SDK

With your project created, the next step is to install the APC SDK:

1. Use the NuGet Package Manager to search for `Azure.Communication.ProgrammableConnectivity`.
2. Install the latest stable version of the SDK to your project.

![Install APC SDK](imgs/install-apc-sdk.jpg)

or use CLI NuGet Package Manager:

```
dotnet add package Azure.Communication.ProgrammableConnectivity
```

## APC SDK Client

The APC SDK simplifies making API calls by providing strongly typed methods for each APC service. Here's how to get started:

### Authenticate the client

Before making any API calls, authenticate using Entra ID credentials:

1. Obtain tokens by implementing the authentication logic in your application.

```csharp
var credentials = new AzureKeyCredential("<your_entera_id_credentials>");
```

### Retrieve Network Information
To make most of the APC calls, you'll need the network information of the device:

1. Use the RetrieveNetwork method provided by the SDK:

```csharp
var networkClient = new NetworkClient(credentials);
var networkInfo = await networkClient.RetrieveNetworkAsync("<device_number>");
```

## APC SDK Calls
The APC SDK provides methods to test various features:

TODO Imperative steps
add this call...

### Sim Swap retrieve/verify

Following shows how to use the `/sim-swap:verify` endpoint

```C#
using Azure.Communication.ProgrammableConnectivity;

private readonly Uri _endpoint = new Uri("https://eastus.prod.apcgatewayapi.azure.com");
private const string ApcGatewayId = "/subscriptions/abcdefgh/resourceGroups/dev-testing-eastus/providers/Microsoft.programmableconnectivity/gateways/apcg-eastus";

SimSwap client = ProgrammableConnectivityClient(_endpoint, DefaultAzureCredential()).GetSimSwapClient()
SimSwapVerificationContent content = new SimSwapVerificationContent(new NetworkIdentifier("NetworkCode", "Orange_Spain"))
{
    PhoneNumber = "+34665439999",
    MaxAgeHours = 120,
};

Response<SimSwapVerificationResult> response = client.Verify(ApcGatewayId, content);
Console.WriteLine($"Verification result: {response.Value.VerificationResult}");
```

Following shows how to use the `/sim-swap:retrieve` endpoint

```C#
using Azure.Communication.ProgrammableConnectivity;

private readonly Uri _endpoint = new Uri("https://eastus.prod.apcgatewayapi.azure.com");
private const string ApcGatewayId = "/subscriptions/abcdefgh/resourceGroups/dev-testing-eastus/providers/Microsoft.programmableconnectivity/gateways/apcg-eastus";

SimSwap client = ProgrammableConnectivityClient(_endpoint, DefaultAzureCredential()).GetSimSwapClient()
SimSwapRetrievalResult content = new SimSwapRetrievalResult(new NetworkIdentifier("NetworkCode", "Orange_Spain"))
{
    PhoneNumber = "+34665439999",
};

Response<SimSwapVerificationResult> response = client.Retrieve(ApcGatewayId, content);
Console.WriteLine($"Date last swapped: {response.Value.Date}");
```

### Location verify

```C#
using Azure.Communication.ProgrammableConnectivity;

private readonly Uri _endpoint = new Uri("https://eastus.prod.apcgatewayapi.azure.com");
private const string ApcGatewayId = "/subscriptions/abcdefgh/resourceGroups/dev-testing-eastus/providers/Microsoft.programmableconnectivity/gateways/apcg-eastus";

DeviceLocation client = ProgrammableConnectivityClient(_endpoint, DefaultAzureCredential()).GetDeviceLocationClient()
DeviceLocationVerificationContent deviceLocationVerificationContent = new DeviceLocationVerificationContent(new NetworkIdentifier("NetworkCode", "Telefonica_Brazil"), 80.0, 85.1, 50, new LocationDevice
{
    PhoneNumber = "+5551980449999",
});

Response<DeviceLocationVerificationResult> result = client.Verify(ApcGatewayId, deviceLocationVerificationContent);

Console.WriteLine($"Date last swapped: {response.Value.VerificationResult}");
```


### NumberVerification verify

Number verification involves 2 steps. In the first request, you receive a redirect URL that must be followed, in order to get teh `ApcCode`. Then in the second request, the `ApcCode` gets sent in.

```C#
using Azure.Communication.ProgrammableConnectivity;

private readonly Uri _endpoint = new Uri("https://eastus.prod.apcgatewayapi.azure.com");
private const string ApcGatewayId = "/subscriptions/abcdefgh/resourceGroups/dev-testing-eastus/providers/Microsoft.programmableconnectivity/gateways/apcg-eastus";

NumberVerification client = ProgrammableConnectivityClient(_endpoint, DefaultAzureCredential()).GetNumberVerificationClient()

NumberVerificationWithoutCodeContent numberVerificationWithoutCodeContent = new NumberVerificationWithoutCodeContent(new NetworkIdentifier("NetworkCode", "Telefonica_Brazil"), new Uri("http://your-redirect-url.com"))
{
    PhoneNumber = "<phoneNumber>",
};
Response response = await client.VerifyWithoutCodeAsync(ApcGatewayId, numberVerificationWithoutCodeContent);

var locationUrl = response.GetRawResponse().Headers.TryGetValue("location", out var location) ? location : "not found";

Console.WriteLine($"location redirect URL: {locationUrl}");

// The `locationUrl` now has to be followed by you.
```

For the second call

```C#
NumberVerificationWithCodeContent numberVerificationWithCodeContent = new NumberVerificationWithCodeContent("<apcCode>");
Response<NumberVerificationResult> response = await client.VerifyWithCodeAsync(ApcGatewayId, numberVerificationWithCodeContent);
```
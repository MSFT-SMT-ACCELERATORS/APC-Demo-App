# Azure Programmable Connectivity (APC) Hands-On Lab

Welcome to the Azure Programmable Connectivity Hands-On Lab. In this lab, we will explore the powerful features of APC that enable developers to integrate telecom operator services directly into their applications. This lab is designed to give you practical experience with APC, taking you from the basics of setup and testing to advanced integration scenarios.

### Suggested Timeline
| Time    | Activity |
| ------- | -------- |
| 10 min  | [Introduction to Azure Programmable Connectivity (APC)](#introduction-to-azure-programmable-connectivity-apc) |
| 30 min  | **Part 1:** [Getting Started with APC](#part-1-get-started-with-apc)   |
|         | [Use Network APIs with the APC SDK Client](#use-network-apis-with-the-apc-sdk-client) |
|         | [Use Network APIs with APC REST APIs](#use-network-apis-with-apc-rest-apis) |
|  1 hour   | **Part 2:** [ Advanced Use Case - Integrating APC into a Banking App](#part-2-advanced-use-case---integrating-apc-into-a-banking-app) |
|         |  [Architecture](#architecture) |
|         |  [Advanced Integration Details](#advanced-integration-details) |
|         |  [Exercise: Deploying and Testing a Demo Banking Application](#exercise-deploying-and-testing-a-demo-banking-application) |
| 30 min  | [Annex](#annex) (optional)   |


- **Part 1** of this lab is designed to give you a swift yet comprehensive introduction to APC, equipping you with the knowledge to deploy an APC Gateway and make initial API calls. It's ideal for learners who are new to APC or require a quick start guide for incorporating APC into their applications.

- **Part 2** provides a deeper dive into APC's real-world applications. It's ideal for those looking to understand the intricacies APC application, integration into frontend and backend services, along with some Network API-specific caveats. This section is recommended for anyone interested in the technical implementation of APC. 


### Complete index

- [Introduction](#introduction-to-azure-programmable-connectivity-apc)
  - [Overview of APC](#overview-of-apc)
  - [Architecture](#architecture)
  - [APC Planned Operator APIs](#apc-planned-operator-apis)
  - [Additional Information](#additional-information)
- **Part 1:**[ Get Started with APC](#part-1-get-started-with-apc)
  - [Prerequisites](#prerequisites)
    - [Create APC Gateway Instance](#create-apc-gateway-instance)
    - [Set up Authentication](#set-up-authentication)
  - [Use Network APIs with the APC SDK Client](#use-network-apis-with-the-apc-sdk-client)
    - [Create a Console Application](#create-a-console-application)
    - [Install the APC SDK](#install-the-apc-sdk)
    - [Instantiate an Authenticated Client](#instantiate-an-authenticated-client)
    - [Make APC Requests](#make-apc-requests)
      - [APC Call #1: Retrieve Network Information](#apc-call-1-retrieve-network-information)
      - [APC Call #2: Sim Swap Retrieve/Verify](#apc-call-2-sim-swap-retrieveverify)
  - [Use Network APIs with APC REST APIs](#use-network-apis-with-apc-rest-apis)
    - [Postman APC requests](#a-make-apc-requests-with-postman)
      - [Postman APC SimSwap Verify Request](#postman-apc-simswap-verify-request)
      - [Postman APC Number Verification Request](#postman-apc-number-verification-request)
    - [.NET HttpClient APC requests](#b-make-apc-requests-with-net-httpclient)
      - [HttpClient APC Retrieve Network Information Request](#http-apc-call-1-retrieve-network-information)
      - [HttpClient APC Verify Sim Swap Request](#http-apc-call-2-verify-sim-swap)
- **Part 2:**[ Advanced Use Case - Integrating APC into a Banking App](#part-2-advanced-use-case---integrating-apc-into-a-banking-app)
  - [Architecture](#architecture)
  - [Advanced Integration Details](#advanced-integration-details)
    - [React Service Calling APC](#react-service-calling-apc)
    - [APC Proxy SDK Usage](#apc-proxy-sdk-usage)
    - [Dependency Injection for SDK + HttpClient](#dependency-injection-for-sdk--httpclient)
    - [Handling Consent permission for Locaction Number Verification](#handling-consent-permission-for-locaction-verification)
    - [Handling Redirections for Number Verification](#handling-redirections-for-number-verification)
  - [Exercise: Deploying and Testing a Demo Banking Application](#exercise-deploying-and-testing-a-demo-banking-application)
    - [Prerequisites](#prerequisites-1)
    - [Run APC Proxy](#run-apc-proxy)
    - [Run Local Client](#run-local-client)
    - [Mobile Testing](#mobile-testing)
- [Annex](#annex)
  - [Additional REST APC calls using .NET HttpClient](#additional-rest-apc-calls-using-net-httpclient)
    - [Location REST APC calls using .NET HttpClient](#location-rest-apc-calls-using-net-httpclient)
    - [Number Verification REST APC calls using .NET HttpClient](#number-verification-rest-apc-calls-using-net-httpclient)
  - [Additional REST APC calls using Postman](#additional-rest-apc-calls-using-postman)
    - [Location REST APC calls using Postman](#location-rest-apc-calls-using-postman)
    - [Number Verification REST APC calls using Postman](#number-verification-rest-apc-calls-using-postman)
  - [.NET HttpClient APC requests](#b-make-apc-requests-with-net-httpclient)
    - [HttpClient APC Verify Device Location Request](#http-apc-call-2-verify-device-location)
    - [HttpClient APC Number Verification Request](#http-apc-call-4-number-verification)
---

## Introduction to Azure Programmable Connectivity (APC)

### Overview of APC

Azure Programmable Connectivity (APC) is an Azure service that connects cloud applications to mobile operator networks APIs. It offers a streamlined method to access an array of operator network services, simplifying the use of telecommunications capabilities like SIM swap detection and location-based services through easy-to-implement APIs

![APC Diagram](imgs/apc-diagram.jpg)

### Architecture

 Here’s a high-level view of the typical architecture:

- **Application Clients**: (Client App Innstance in diagram) These can range from Single Page Applications (SPAs) to mobile apps or any other client-side applications. They are the consumer-facing end of the system, interacting with the application service to perform various tasks like SIM swap checks or retrieving location data.

- **Application Service**: (Application Backend in diagram) This is the backend that your application clients communicate with. It is responsible for processing client requests, handling business logic, and making authenticated calls to the APC Gateway. This service can be hosted on cloud platforms like Azure or on-premises.

- **APC Gateway**: Hosted on Azure, the APC Gateway is an intermediary that securely connects to multiple operator networks. It translates the requests from the application service into the specific protocols, authentication and data formats that telecom operators require.

- **Operator Network APIs**: These are the services and APIs provided by telecom operators, which offer functionality such as number verification, SIM swap detection, and user location services. APC abstracts the complexities of these operator-specific APIs, presenting a unified and standardized interface for the application service to interact with.

Here is an overview diagram depicting the interaction between these components:

![APC Simple diagram](image-39.png)

### APC Planned Operator APIs

APC enables direct access to a range of operator APIs, designed to streamline complex telecom functionalities into developer-friendly services. Below is a table summarizing the currently supported operator APIs:

| API                 | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| [SIM Swap Detection](#sim-swap-detection) | Allows detection of SIM card changes, crucial for fraud prevention in security-sensitive operations. |
| [Number Verification](#number-verification) | Verifies the authenticity of mobile numbers, enhancing trust and reducing spam.                |
| [Device Location](#device-location)   | Provides network-based location data, ideal for location-sensitive applications.              |


Find in the annex detailed information about each [Network APIs](#network-apis).

**Bellow are the planned Operator APIs coming to APC:**

| API                 | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| Quality on Demand (QoD)  | Ensures prioritized network traffic for essential services, maintaining performance standards. |
| Billing | Facilitates direct carrier billing capabilities, enabling seamless transactions.                |


### Additional information

For a deeper understanding of Azure Programmable Connectivity (APC), including its potential impact and further details on its capabilities, refer to the following resources:

- [APC annoucement blogpost with additional resources](https://techcommunity.microsoft.com/t5/azure-for-operators-blog/azure-programmable-connectivity-empowering-the-next-generation/ba-p/4063967)

- [Microsoft Learn: APC Overview](https://learn.microsoft.com/en-us/azure/programmable-connectivity/azure-programmable-connectivity-overview)

- [APC Product Page](https://azure.microsoft.com/en-us/products/programmable-connectivity/)


## Part 1: Get Started with APC

### Contents
- [Part 1: Get Started with APC](#part-1-get-started-with-apc)
  - [Prerequisites](#prerequisites)
    - [Create APC Gateway Instance](#create-apc-gateway-instance)
    - [Set up Authentication](#set-up-authentication)
  - [Use Network APIs with the APC SDK Client](#use-network-apis-with-the-apc-sdk-client)
    - [Create a Console Application](#create-a-console-application)
    - [Install the APC SDK](#install-the-apc-sdk)
    - [Instantiate an Authenticated Client](#instantiate-an-authenticated-client)
    - [SDK APC Requests](#make-apc-requests)
      - [APC SDK Call #1: Retrieve Network Information](#apc-call-1-retrieve-network-information)
      - [APC SDK Call #3: Sim Swap Retrieve/Verify](#apc-call-3-sim-swap-retrieveverify)
  - [Use Network APIs with APC REST APIs](#use-network-apis-with-apc-rest-apis)
    - [Postman APC requests](#a-make-apc-requests-with-postman)
      - [Postman APC SimSwap Verify Request](#postman-apc-simswap-verify-request)
      - [Postman APC Number Verification Request](#postman-apc-number-verification-request)
    - [.NET HttpClient APC requests](#b-make-apc-requests-with-net-httpclient)
      - [HttpClient APC Retrieve Network Information Request](#http-apc-call-1-retrieve-network-information)
      - [HttpClient APC Verify Sim Swap Request](#http-apc-call-3-verify-sim-swap)
- (optional) [Part 1 Annex: Make APC Requests](#use-network-apis-with-the-apc-sdk-client)
    - [HttpClient APC Verify Device Location Request](#http-apc-call-2-verify-device-location)
    - [HttpClient APC Number Verification Request](#http-apc-call-4-number-verification)
    - [APC SDK Call #2: Device Location](#apc-call-2-device-location)
    - [APC SDK Call #3: Number verification](#apc-call-4-number-verification)
---

### Prerequisites

Before starting your journey with Azure Programmable Connectivity (APC), make sure you have the following prerequisites ready:

- **Azure Subscription**: Access to an Azure subscription is necessary to deploy APC resources. If you don't have one, you can create a [free account](https://azure.microsoft.com/free/).

- **Azure CLI and PowerShell**: Familiarity with Azure CLI or PowerShell is essential for deploying resources and automation scripting.

- **Development Environment**: Set up your preferred IDE or code editor, such as Visual Studio Code or Visual Studio, configured for console app development.

#### Create APC Gateway Instance

* Follow the [guide](https://learn.microsoft.com/azure/programmable-connectivity/azure-programmable-connectivity-create-gateway) to create a gateway, or have one already.
* Once you are done creating the gateway, note down the APC Gateway resoruce id endpoint, as explained in this section.

Deploying an APC Gateway in Azure is a straightforward process that involves the following steps:

1. In the Azure portal, search for **APC Gateways** and then select **Create**.

   ![Search for APC Gateway](imgs/001-01-set-up-portal-create.jpg)

2. Select your **Subscription**, **Resource Group**, and **Region**.

   ![Create APC Gateway](imgs/001-02-set-up-portal-create-step1.jpg)

3. Provide a unique **Name** for your gateway and proceed to the next steps.

Once your gateway is created, you'll need to configure it:

1. Assign the telecom operator setup, selecting the appropriate APIs and plans.

2. Complete the application details, which will be shared with the operator for validation.

   ![Configure APC](imgs/001-02-set-up-portal-create-step2.jpg)

3. Agree to the operators' terms and conditions to finalize the setup.

Now, note down relevant resource information for later steps:

1. Navigate to your APC Gateway resource in the Azure portal and copy the `resource Id` and the `endpoint` value:

![APC Gateway resource](image-38.png)

#### Set up authentication

To authenticate and access the APC Gateway, create a Microsoft Entra application in the same directory or tenant.

1. Follow the instructions to [register an application with Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal), create a service principal and record the clientId and secret.
    1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) as at least a **Cloud Application Administrator**. 
    1. Browse to **Identity** > **Applications** > **App registrations** then select **New registration**.
    1. Name the application, for example "apc-hol-exercise". 
    1. Select a supported account type, which determines who can use the application. For the exercises in this lab it won´t matter since we are using a client credentials flow with Client Id and secret.
    1. Don´t specify any return URI as it´s not needed for these HOL exercises.
    1. Select **Register**.

    ![App Registration](image-40.png)

2. Create and record the application client ID and client secret or certificate for future use.
    1. Browse to **Identity** > **Applications** > **App registrations**, then select your application.
    1. Select **Certificates & secrets**.
    1. Select **Client secrets**, and then Select **New client secret**.
    1. Provide a description of the secret, and a duration.
    1. Select **Add**.

![Record Client Secret](image-34.png)

3. Assign the necessary role to interact with the APC Gateway to your application by running the following Azure CLI command. Replace or assign values to `$SUB_ID` with your subscription id, `RG_NAME` with resource group name where the APC Gateway resource is and `$GATEWAY_NAME` for and the APC Gateway resource name. Log in using `az login` if you have to:

```sh
az role assignment create --role 609c0c20-e0a0-4a71-b99f-e7e755ac493d
--scope /subscriptions/$SUB_ID/resourceGroups/$RG_NAME/providers/Microsoft.ProgrammableConnectivity/gateways/$GATEWAY_NAME
--assignee $APP_ID
```

### Use Network APIs with the APC SDK Client

The APC SDK simplifies making API calls by providing strongly typed methods for each APC service. Here's how to get started:

#### Create a Console Application

To start using the Azure Programmable Connectivity (APC) SDK, you'll need to create a new console application. This application will serve as the foundation for integrating with APC services.

1. Open your IDE or code editor.
2. Create a new .NET 8 console application project.
3. Name your project appropriately to reflect its purpose, such as `APCIntegration`.

#### Install the APC SDK

With your project created, the next step is to install the APC SDK:

1. Use the NuGet Package Manager and search for `Azure.Communication.ProgrammableConnectivity`.
2. Install the latest stable version of the SDK to your project.

![APC SDK nugget install](image-41.png) TODO Repalce with actual Nuget

or use dotnet CLI to install the NuGet Package from the project folder path:

```sh
dotnet add package Azure.Communication.ProgrammableConnectivity --prerelease
```

#### Instanciate an authenticated client

The client library uses [`Azure.Identity`](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet) credentials to authenticate with APC. 

1. Install Azure.Identity nugget package with the Nuget Package Manager or with the following command:

```sh
dotnet add package Azure.Identity
```

![Azure.Identity nugget install](image-41.png)

2. In Program.cs, create values for the recorded APC Gateway information and Entra client credentials from earlier steps.

```csharp
// Setup your APC endpoint and gateway resource id here
var apcEndpoint = "https://eastus.prod.apcgatewayapi.azure.com";
var apcGatewayId = "/subscriptions/$your-subscription-id/resourceGroups/$your-resource-group/providers/Microsoft.programmableconnectivity/gateways/$your-gateway-name";

// Your Azure Entra application's details
var clientId = "your-application-client-id";
var clientSecret = "your-application-client-secret";
var tenantId = "your-tenant-id";
```

3. Obtain client credential by implementing this authentication logic in your application using the noted clientId and clientSecret from the authentication section in prerequisites.

```csharp
TokenCredential credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
```

3. Instanciate the SDK client using:

```csharp
ProgrammableConnectivityClient apcClient = new ProgrammableConnectivityClient(apcEndpoint, credential);
```

![Console app APC SDK setup with auth](image-1.png)

#### Make APC requests

For each call that you make to APC with the SDK, you will follow the same pattern:
* Create a client `apcClient = new ProgrammableConnectivityClient()`
* Access the sub-client for your use case (sim-swap/location/number-verification/device-network) by calling say `apcClient.GetSimSwapClient()`
* Create the content for your request by using the objects given by the SDK, for example `SimSwapVerificationContent`
* Call the client with the content you've created
* Access the result

##### APC SDK: Retrieve Network Information

To make APC operator API calls, you'll need the network identifier for the cellular network device address you are calling from. More informtion on this APC Call: [Device Network](#device-network).


1. Access the subclient for the device network from the base client created earlier `apcClient`:

```csharp
// Retrieve network information
var deviceNetworkApcClient = apcClient.GetDeviceNetworkClient();
```

2. Create the device-network request content using the SDK class `Networkidentifier`. Use `phone-number` to retrieve your public ip. APC will identify which is operator network is managing it:

```csharp
// TODO get actual IP and test
var networkIdentifier = new NetworkIdentifier("IPv4", "176.83.74.44");
```

3. Retrieve the device-network response:

```csharp
Response<NetworkRetrievalResult> response = deviceNetworkApcClient.Retrieve(ApcGatewayId, networkIdentifier);
Console.WriteLine($"Network Identifier result: {networkResponse.Value}");
```

![alt text](image-3.png)


##### APC SDK: Sim Swap retrieve/verify

Once you have the client configured and retrieved the network identifier, proceed to make a Sim Swap verification request. This call will check whether the SIM card you are using for the cellular network has been replaced recently.For more informtion on this APC Call: [Sim Swap Detection](#sim-swap-detection). 

1. Add code to access the subclient for sim-swap from the base client created earlier `apcClient`:

```csharp
var deviceNetworkApcClient = apcClient.GetSimSwapClient()
```

2. Create the sim-swap request content using the SDK class `SimSwapVerificationContent`. PhoneNumber `phone-number` with your actual number associated with the cellular network you are using. Include the country code. You should have the cellular network identifier in the previous request:

```csharp
// Retrieve SIM swap verification
SimSwapVerificationContent simSwapContent = new SimSwapVerificationContent(new NetworkIdentifier("NetworkCode", networkResponse.Value.NetworkCode))
{
    PhoneNumber = "+00number-with-countrycode",
    MaxAgeHours = 240
};
```

3. Retrieve the device-network response:

```csharp
Response<SimSwapVerificationResult> response = client.Verify(ApcGatewayId, content);
Console.WriteLine($"Verification result: {response.Value.VerificationResult}");
```

![alt text](image-5.png)

(OPTIONAL) If you wish to test more APC APIs using this method, find in the annex additional APC API calls with implementation details using the APC .NET SDK approach:

- [APC SDK: Device Location](#apc-sdk-device-location)
- [APC SDK: Number Verification ](#apc-sdk-number-verification)

### Use Network APIs with APC REST APIs

This section covers how to interact with Azure Programmable Connectivity (APC) using REST HTTP calls. You'll learn to set up Postman for making authenticated requests, and how to construct these requests using .NET HttpClient in a console application.

#### A. Make APC requests with Postman

To make authenticated requests to APC using REST HTTP calls, follow the process aided by the postman collection referenced in this guide.

- Make sure the collection has the authentication token properly configured. If this is not done prior to making a request or the token has expired (1 hour lifetime) the requests will return **HTTP 401 Unauthorized** results.
- Navigate to the desired APC request, for instance `sim-swap:verify`
- Create the content for your request by replacing the payload examples given in postman with your information
- Send the request
- Access the result

##### Setup: Configure Postman for Authenticated Requests to APC

To make authenticated requests to the APC API, you need to set up Postman with the correct authorization headers. Here are the steps to configure Postman:

1. Open Postman, click import and drag the collection linked in this repo [Link to APC Postman collection](apc-postman.json)

![Import collection](image-6.png)

2. Double click the collection name that appeared on the collection side menu and go to the tab `Variables`. From there, update the `auth-secret`, `auth-clientId`, `auth-tenantid` and also the `apc-id` and `endpont` values. 

![Collection auth var](image-30.png)
![Collection APC Gateway id var](image-33.png)

3. Click save or press `Ctrl+S` and go to the tab `Authorization`

![Collection auth tab](image-7.png)

4. Scroll down to `Configure New Token` advanced section and click the button `Generate New Access Token`

![Collection Get new token](image-32.png)

5. Once succeeded, select `Use Token`. This token will be valid for 1 hour. You can skip to the Generate New Token step every time it expires.

![Collection use token](image-31.png)


##### Postman APC SimSwap Verify Request

To make APC operator API calls, you'll need the network identifier for the cellular network device address you are calling from. More informtion on this APC Call: [Device Netwrok](#device-network).

1. Navigate to `network:retrive` request

![alt text](image-42.png)

2. Adjust the request payload in the `Body` tab

For the `identifier` property use your public IP for you cellular connection. TODO explain how

**Body**:
  ```json
  {
      "identifierType": "IPv4",
      "identifier": "176.83.74.44"
  }
  ```

![alt text](image-43.png)

3. Click `Send` and view the response

![alt text](image-11.png)

##### Postman APC SimSwap Verify Request

1. Navigate to `sim-swap:verify` request

![alt text](image-44.png)

2. Adjust the request payload in the `Body` tab

- For the `networkIdentifier.identifier` property should contain the result from the network retrieve request you made earlier.
- `phoneNumber` property should contain the phone number including country code **you are using for cellular network connectiviy**.

More information on properties for this Network API: [Sim Swap Detection](#sim-swap-detection)

Here's an example for the request payload to perform a SIM Swap verify:

**Body**:
  ```json
  {
    "phoneNumber": "+1234567890",
    "networkIdentifier": {
      "identifierType": "NetworkCode",
      "identifier": "network-code-here"
    }
  }
  ```

![alt text](image-10.png)

3. Click `Send` and view the response

![alt text](image-11.png)

#### B. Make APC requests with .NET HttpClient

You can also use the .NET HttpClient to make authenticated calls to APC. Here's a basic example of how you can implement this in a .NET 8 console application:

##### Set up a .NET httpClient for APC
1. Create a Console App project in Net8.0 in your preferred IDE.
2. In Program.cs, create values for the recorded APC Gateway information and Entra client credentials from earlier steps.

```csharp
// Setup your APC endpoint and gateway resource id here
var apcEndpoint = "https://eastus.prod.apcgatewayapi.azure.com";
var apcGatewayId = "/subscriptions/$your-subscription-id/resourceGroups/$your-resource-group/providers/Microsoft.programmableconnectivity/gateways/$your-gateway-name";

// Your Azure Entra application's details
var clientId = "your-application-client-id";
var clientSecret = "your-application-client-secret";
var tenantId = "your-tenant-id";
```

3. Install Azure.Identity nugget package with the Nuget Package Manager or with the following command:

```sh
dotnet add package Azure.Identity
```

![Azure.Identity nugget install](image-41.png)

4. Add the following code to Retrieve a token for your HttpClient.:
```csharp
// Authentication with Azure AD to obtain Bearer Token.
var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
var token = await credential.GetTokenAsync(new Azure.Core.TokenRequestContext(new[] { "https://management.azure.com/.default" }));
string accessToken = token.Token;
```

5. Add the required headers to call APC using a REST client:
```csharp
// Prepare the HttpClient with the Bearer token and common headers.
using var httpClient = new HttpClient();
httpClient.BaseAddress = new Uri(baseUrl);
httpClient.DefaultRequestHeaders.Add("apc-gateway-id", apcGatewayId);
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
```

Now you are ready to start calling APC API:
![alt text](image-18.png)

##### Http APC Call #1: Retrieve Network Information
To make APC operator API calls, you'll need the network identifier for the cellular network device address you are calling from. More informtion on this APC Call: [Device Netwrok](#device-network).

1. Prepare the network retrieve request content:
```csharp
string networkApiUrl = $"{baseUrl}/device-network/network:retrieve";
var networkIdentifier = new
    {
        identifierType = "IPv4",
        identifier = "your-ip" // phone?
    };
var networkContent = new StringContent(JsonSerializer.Serialize(networkIdentifier), Encoding.UTF8, "application/json");
```

2. Retrieve the device-network response:
```csharp
HttpResponseMessage networkResponse = await httpClient.PostAsync(networkApiUrl, networkContent);
var networkResult = await JsonSerializer.DeserializeAsync<NetworkRetrievalResult>(await networkResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions{PropertyNameCaseInsensitive = true});
Console.WriteLine($"Network retrieval result: {networkResult}");
```
![alt text](image-19.png)

##### Http APC Call #2: Verify Sim Swap

Once you have the HTTP client configured and retrieved the network identifier, proceed to make a Sim Swap verification request. This call will check whether the SIM card you are using for the cellular network has been replaced recently. For more informtion on this APC Call: [Sim Swap Detection](#sim-swap-detection). 

1. Prepare the verify sim swap content:

// TODO fix networkIdentifier

```csharp
string simSwapApiUrl = $"{baseUrl}/sim-swap/sim-swap:verify";
var simSwapContent = new
{
    phoneNumber = "your-phone-with-country-code",
    maxAgeHours = 240,
    networkCode = networkResult.networkCode
};
var simSwapRequestContent = new StringContent(JsonSerializer.Serialize(simSwapContent), Encoding.UTF8, "application/json");
```

2. Retrieve the verify sim swap response:
```csharp
HttpResponseMessage simSwapResponse = await httpClient.PostAsync(simSwapApiUrl, simSwapRequestContent);
var simSwapResult = await JsonSerializer.DeserializeAsync<SimSwapVerificationResult>(await simSwapResponse.Content.ReadAsStreamAsync(),
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Sim swap verification result: {simSwapResult.VerificationResult}");
```
![alt text](image-21.png)

(OPTIONAL) If you wish to test more APC APIs using this method, find in the annex additional REST calls with implementation details using the HttpClient approach:

- [Location REST APC call using .NET HttpClient]()
- [Number Verification  REST APC call using .NET HttpClient]()


## Part 2: Advanced Use Case - Integrating APC into a Banking App

In this section, we explore how Azure Programmable Connectivity (APC) can be integrated into an example banking application, leveraging network APIs to enhance security and user experience. The sample application is detailed in this [README file](../README.md) located in the repository.


### Contents

- [Architecture](#architecture)
- [Exercise: Deploying and Testing a Demo Application](#exercise-deploying-and-testing-a-demo-application)
  - [APC Requests from the Front End](#apc-requests-from-the-front-end)
  - [Network Limitations](#network-limitations)
  - [Dependency Injection for APC SDK, HTTP Client, and MockService](#dependency-injection-for-apc-sdk-http-client-and-mockservice)
  - [Number Verification Flow](#number-verification-flow)
  - [Device Location](#device-location)


---
- [Part 2: Advanced Use Case - Integrating APC into a Banking App](#part-2-advanced-use-case---integrating-apc-into-a-banking-app)
  - [Architecture](#architecture)
  - [Advanced Integration Details](#advanced-integration-details)
    - [React Service Calling APC](#react-service-calling-apc)
    - [APC Proxy SDK Usage](#apc-proxy-sdk-usage)
    - [Dependency Injection for SDK + HttpClient](#dependency-injection-for-sdk--httpclient)
    - [Handling Redirections for Number Verification](#handling-redirections-for-number-verification)
  - [Exercise: Deploying and Testing a Demo Banking Application](#exercise-deploying-and-testing-a-demo-banking-application)
    - [Prerequisites](#prerequisites-1)
    - [Run APC Proxy](#run-apc-proxy)
    - [Run Local Client](#run-local-client)
    - [Mobile Testing](#mobile-testing)
---


### Architecture

This section provides a brief technical description of the demo application's architecture. The application is designed to interact with APC for enhanced anti-fraud security measures such as SIM swap detection, number verification and user location verification.

![Architecture Diagram](image-13.png)

#### Components

- **Leaves Bank App**
  - **Technology**: Built using React Native and Expo Go. Runs on client devices (smartphones).
  - **Features**: Interaction demo with the APCProxyServer for APC interactions.
  - **Repository path**: *src/APC.MobileApp/ReactNative*

- **Leaves Bank Backend Service**
  - **Technology**: .NET8 Web API hosted in an Azure App Service.
  - **Features**: Acts as an intermediary between the React Native app and the APC API and could host additional app logic.
  - **Repository path**: *src/APC.Proxy.API*

- **APC Gateway**
  - **Technology**: Azure service
  - **Features**:  interfaces with mobile network operator APIs.

### Exercise: Deploying and Testing a Demo Application

The practical exercise consists of deploying and testing the "Leaves Banking application", a demo application that leverages APC Network APIs to enhance anti-fraud prevention.

#### Prerequisites

This exercise assumes you completed at least the following sections from part 1:

- [Create APC Gateway Instance](#create-apc-gateway-instance)
- [Set up Authentication](#set-up-authentication)

And will require

- A cellular network from a supported operator TODO explain
- A smartphone running Android or iOS
 
#### Setup Instructions

Follow the steps in the [demo application README](../README.md) to set up:

- **APC Proxy running in an Azure Web App**
- **Leaves Bank mobile app running on your phone using Expo Go**

Then, follow the usage instructions intended to complement the advanced technical implementations or caveats related to applications using Azure Programmable Connectivity (APC).

### APC Requests from the Front End

Direct APC calls from the frontend are not advisable due to the sensitive nature of the credentials involved (client ID and secret). Exposing these details can lead to unauthorized access and misuse of Azure resources, as browser tools allow easy access to frontend code.

Instead, APC calls are delegated to the backend service, the APC Proxy, which securely handles authentication and integration. Here's an example of how this is implemented:

1. **First the client app makes a request with the required Network API payload to the backend service.** 
Find the full service in *REPO-PATH\ReactNative\app\Services\APCService.ts*

```ts
// apcClient is an autogenerated axios client that points to the backend service
export const checkSimChange = async (apiClient: APCApi, phoneNumber: string) => {
    const networkCode = await getNetworkCode(apiClient);
    const response = await apiClient.apiAPCSimSwapSimSwapverifyPost({
        phoneNumber:  '+' + phoneNumber,
        maxAgeHours: 240,
        networkIdentifier: {
            identifierType: 'NetworkCode',
            identifier: networkCode
        }
    })

    return response.data.verificationResult;
}
```

2. **The backend service processes the call and makes an authenticated request to the APC Gateway using an HttpClient or the SDK** More on the possible implementations later. Find the client interface *REPO-PATH\APC.Proxy.API\APC.Client\IAPCClient.cs* TODO: ADD SDK

```csharp
    // Configure httpClient with APC API settings
    _httpClient.BaseAddress = new Uri(settings.Value.BaseUri);
    _httpClient.DefaultRequestHeaders.Add("apc-gateway-id", _settings.GatewayId);

    ...

    public async Task<HttpResponseMessage> CallApcApiAsync(HttpMethod httpMethod, string endpoint, object? requestContent = null)
    {
        var accessToken = await GetAccessTokenAsync();
        var request = new HttpRequestMessage(httpMethod, endpoint)
        {
            Content = requestContent != null ? JsonContent.Create(requestContent) : null
        };

        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        request.Headers.Add("x-ms-client-request-id", Guid.NewGuid().ToString());

        var response = await _httpClient.SendAsync(request);

        return response;
    }
```

3. **The APC Gateway respone is returned to the client application**

### Network Limitations

For this application to use Azure Programmable Connectivity (APC) effectively, it must run over cellular networks. This requirement comes from how APC works with these networks to check and approve requests. APC uses the IP address from which a request is made as a key part of its authentication process to ensure the requests actually come from the network they say they do. This is crucial for sensitive actions like SIM swap detection or getting network-specific information.

In this demo app, the APC Proxy backend gathers network info using the IP from frontend requests and uses this IP as the identifier for further APC requests:

```csharp
    [ApiController]
    [Route("[controller]")]
    public class NetworkInfoController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetNetworkInfo()
        {
            // Retrieve the remote IP address and port from the HttpContext
            var remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString();
            var remotePort = Request.HttpContext.Connection.RemotePort;

            // Check if the IP address is not available
            if (string.IsNullOrEmpty(remoteIpAddress))
            {
                return NotFound("Remote IP address not found.");
            }

            // Return the remote IP address and port
            return Ok($"Remote IP address: {remoteIpAddress}, Remote port: {remotePort}");
        }
    }
}
```

Additionally, operations like number verification follow a specific process that requires these requests to come from the same network as the phone number being checked. Making requests from IP addresses outside the intended network will result in unathorized results in APC hence **the client application must use the cellular network instead of an available WiFI** connection from a non cellular network.

### Number Verification Process Overview

The number verification process involves several steps where the client application, the backend service, and the APC gateway interact through direct API calls and handle redirections for proper authentication and authorization.

#### Initial Request from Client App to Backend Service:
1. **Client App (Leaves Bank App)** sends a request to initiate number verification.
2. **Leaves Bank Backend Service** prepares to request an authentication code from the APC gateway.

#### Backend Service Requests APC Gateway:
3. **APC Gateway Call**: The backend makes a POST request to APC Gateway, the response will have Status HTTP 302 but the redirections must be followed by the frontend, as these requests must come from the cellular network the client app is using.

#### Manually handling redirections in the backend:
4. **302 Redirect Response**: APC responds with a 302 redirect containing a URL for client app interaction.
5. **Prevent Automatic Redirection in .NET 8 HttpClient**:

    ```csharp
    var handler = new HttpClientHandler { AllowAutoRedirect = false };
    using var httpClient = new HttpClient(handler);
    ```

The client app can follow redirections automatically until it retrieves a response.

#### Handling Consent Permission for Location Verification

For Network API operations that require device location information, such as location verification, it's essential to manage consent permissions effectively. This section outlines how the banking app ensures compliance with privacy regulations and operator terms during such processes.

1. **User Redirects for Consent**: If the operator requires user consent for location verification, the banking app redirects users to a consent page. This step is crucial for maintaining compliance with privacy regulations and respecting user and operator terms.

2. **Handling Location Access Errors**: Proper error handling is vital when operators deny location access. While the demo app does not handle this scenario explicitly, it's recommended to implement the following approach:
   - The backend service should capture any errors related to location access denials.
   - These errors typically include a URL provided by the operator that contains instructions for the user to grant location verification permissions.
   - The frontend should then open a browser window directing the user to this URL, allowing them to follow their operator's instructions to grant necessary permissions.

## Annex

### Contents

---
- [Annex](#annex)
  - [Network APIs](#network-apis)
    - [SIM Swap Detection](#sim-swap-detection)
    - [Number Verification](#number-verification)
    - [Location Services](#location-services) 
  - [Additional APC SDK requests using .NET SDK](#additional-apc-sdk-examples-using-net-sdk)
    - [Location APC SDK request](#apc-sdk-device-location)
    - [Number Verification APC SDK request](#apc-sdk-number-verification)
  - [Additional REST APC requests using .NET HttpClient](#additional-apc-rest-http-examples-using-net-httpclient)
    - [Location APC REST .NET HttpClient request](#httpclient-apc-verify-device-location)
    - [Number Verification APC REST HttpClient request](#httpclient-apc-number-verification)
  - [Additional REST APC requests using Postman](#additional-apc-rest-http-examples-using-postman)
    - [Number Verification APC REST Postman request](#postman-apc-number-verification-request)

### Network APIs

#### SIM Swap Detection

##### Description
Detect changes in SIM card associations with mobile numbers to enhance security and fraud detection mechanisms. This API monitors and alerts on suspicious activity suggesting a SIM swap.

##### Properties
- **SubscriberId**: The unique identifier of the mobile subscriber.
- **LastSwapDate**: The timestamp of the last detected SIM swap.
- **AlertEnabled**: Boolean to enable real-time alerts on SIM swap detection.


#### Properties
- **SubscriberId**: The unique identifier of the mobile subscriber.
- **LastSwapDate**: The timestamp of the last detected SIM swap.
- **AlertEnabled**: Boolean to enable real-time alerts on SIM swap detection.

#### Number Verification

##### Description
Verify the authenticity of a mobile number to ensure it is currently active and can receive communications. This helps in validating user identity and reducing fraud.

##### Properties
- **PhoneNumber**: The mobile number to verify.
- **VerificationStatus**: Indicates whether the number is verified.
- **VerificationMethod**: Method used for number verification (SMS, Call, etc.).

##### OAuth Flow
WIP

#### Device Location

##### Description
Provide real-time location data of a mobile device with the consent of the mobile user. Useful for applications requiring geolocation, such as logistics and personal security.

##### Properties
- **DeviceId**: Identifier for the device whose location is being tracked.
- **Location**: Current geolocation data (latitude, longitude).
- **Accuracy**: Accuracy of the location data.

##### Consent Error - Operator Permission
- If location data access is denied by the operator, the API will return a `ConsentError`.
- Error handling should account for permissions being revoked or not granted by the user or operator.


### Additional APC SDK examples using .NET SDK

##### APC SDK: Device Location

Device location verification can fail if the operator line owner has not given location verification permission for this application. More on this and how to approach it in code [here](#handling-consent-permission-for-locaction-verification)

1. Add code to access the subclient for sim-swap from the base client created earlier `apcClient`:
```csharp
var deviceLocationClient = apcClient.GetDeviceLocationClient();
```
2. Create the location-verify request content using the SDK class `DeviceLocationVerificationContent`. PhoneNumber `phone-number` with your actual number associated with the cellular network you are using:
```csharp
var deviceLocationVerificationContent = new DeviceLocationVerificationContent(new NetworkIdentifier("NetworkCode", "Telefonica_Brazil"), 80.0, 85.1, 50, new LocationDevice
{
    PhoneNumber = "+8000000000000",
});
```
3. Retrieve the device-network response:
```csharp
Response<DeviceLocationVerificationResult> result = deviceLocationClient.Verify(apcGatewayId, deviceLocationVerificationContent);
Console.WriteLine(result.Value.VerificationResult);
```
![alt text](image-15.png)

##### APC SDK: Number verification

Number verification involves 2 steps. In the first request, you receive a redirect URL that must be followed, in order to get teh ApcCode. Then in the second request, the ApcCode gets sent in.

For the fist call:

1. Add code to access the subclient for sim-swap from the base client created earlier `apcClient`:
```csharp
NumberVerification numberVerificationClient = apcClient.GetNumberVerificationClient();

```
2. Create the number verification request content using the SDK class `NumberVerificationWithoutCodeContent`. PhoneNumber `phone-number` with your actual number associated with the cellular network you are using:
```csharp
NumberVerificationWithoutCodeContent numberVerificationWithoutCodeContent = new NumberVerificationWithoutCodeContent(
    new NetworkIdentifier("NetworkCode", "Telefonica_Spain"),
    new Uri("http://your-redirect-url.com")){ PhoneNumber = "<phoneNumber>", };

```
3. Retrieve the apcCode from the response:
```csharp
var response = await numberVerificationClient.VerifyWithoutCodeAsync(apcGatewayId, numberVerificationWithoutCodeContent);

var locationUrl = response.GetRawResponse().Headers.TryGetValue("location", out var location) ? location : "not found";

Console.WriteLine($"location redirect URL: {locationUrl}");
```
![alt text](image-16.png)

For the second call

1. Retrieve the code by following the previous `locationUrl`:
```csharp
var apcCode = "aad"; // WIP follow locationUrl
```
2. Create the number verification request content using the SDK class `NumberVerificationWithCodeContent`. Use the `apcCode` retrieved:
```csharp
NumberVerificationWithCodeContent numberVerificationWithCodeContent = new NumberVerificationWithCodeContent(apcCode);
```
3. Retrieve the verification result with the code `NumberVerificationWithCodeContent`. Use the `apcCode` retrieved:
```csharp
Response<NumberVerificationResult> numberVerificationResponse = await numberVerificationClient.VerifyWithCodeAsync(apcGatewayId, numberVerificationWithCodeContent);
Console.WriteLine(numberVerificationResponse.Value.VerificationResult);
```
![alt text](image-17.png)



### Additional APC REST HTTP examples using .NET HttpClient

##### HttpClient APC: Verify device location
1. Prepare the device location verify content:
```csharp
string locationApiUrl = $"{baseUrl}/device-location/location:verify";
var locationContent = new
{
    networkIdentifier = new { networkCode = networkResult.networkCode },
    latitude = 40.7128,
    longitude = -74.0060,
    accuracy = 10,
    locationDevice = new { phoneNumber = "your-phone-with-country-code" }
};
var locationRequestContent = new StringContent(JsonSerializer.Serialize(locationContent), Encoding.UTF8, "application/json");
```

2. Retrieve the device location verify response:
```csharp
HttpResponseMessage locationResponse = await httpClient.PostAsync(locationApiUrl, locationRequestContent);
var locationResult = await JsonSerializer.DeserializeAsync<DeviceLocationVerificationResult>(await locationResponse.Content.ReadAsStreamAsync(),
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Device location verification result: {locationResult.VerificationResult}");
```
![alt text](image-20.png)

##### HttpClient APC: Number verification


Number verification involves 2 APC requests along with some HTTP 302 redirections that in a normal scenario would befollowed automatically, refer to [Part 2: TODO LINk](#part-2-advanced-use-case---integrating-apc-into-a-banking-app) for real-word number verification example. 

**APC Requests for number verification:**

- Retrieve APC auth code flow: you receive some HTTP 302 redirect responses from and to operator authentication servers that should be followed to retrieve the APC Code.
- Verify the retrieved APC auth code.


1. Since the first call returns HTTP 302 redirect responses, set up the HttpClient you instanciated earlier to not automatically follow redirects.
    1. Create a `HttpClientHandler` with `AllowAutoRedirect` property set to false

        ```csharp
        var handler = new HttpClientHandler
        {
            AllowAutoRedirect = false
        };
        ```
    2. Add the handler as a parameter in the httpCleint constructor call.

        ```csharp
        using var httpClient = new HttpClient(handler);
        ```

2. Now that you disabled automatic redirection, make the first APC request and follow redirections  manually, as this is a demo exercise and not the intended setup.
    1. Prepare the number verification apc code retrieval request. The request content property `redirectUri` can be any Uri as it won't be followed in this case, however in real-word scenarios, this should a service of yours capable of making or propagating APC requests. ead more about real-word scenarios in [Part 2: TODO LINk](#part-2-advanced-use-case---integrating-apc-into-a-banking-app)
        ```csharp
        // Number verification
        // First Number Verification Request
        string numberVerificationInitUrl = $"{baseUrl}/number-verification/number:verify";
        var numberVerificationInitContent = new
        {
            networkIdentifier = new { identifierType = "NetworkCode", identifier = networkResult.networkCode },
            phoneNumber = "+34618125036",
            redirectUri = "https://localhost:7127/api/APC/number-verification/apcauthcallback"
        };
        var initRequestContent = new StringContent(JsonSerializer.Serialize(numberVerificationInitContent), Encoding.UTF8, "application/json");
        ```
        ![alt text](image-36.png)

    2. **First APC Request:** Make the HTTP Request. The result should be a HTTP `302` response with a Location header containing the next call in the number verification flow. This location won't be followed automatically since we configured the HttpClient when instanciating it.
    
        ```csharp
        // Send the initial request and handle redirects to capture apcCode
        HttpResponseMessage initialNumberVerificationResponse = await httpClient.PostAsync(numberVerificationInitUrl, initRequestContent);
        ```

    3. Make a new HTTP GET to the url value from the `Location` header on the previous response. Send the GET request and copy the next `Location` header value from the new 302 response.
        ```csharp
        // Following redirects manually
        string firstRedirectUri = initialNumberVerificationResponse.Headers.Location?.ToString();
        HttpResponseMessage firstRedirectResponse = await httpClient.GetAsync(firstRedirectUri);
        ```
        ![Initial request with first redirection](image-37.png)

    4. Add the three remaining manual redirects.
        ```csharp
        // Following redirects manually
        string firstRedirectUri = initialNumberVerificationResponse.Headers.Location?.ToString();
        HttpResponseMessage firstRedirectResponse = await httpClient.GetAsync(firstRedirectUri);
        ```
        
    5. Recod the `Location` header value for the fourth redirect. It should contain the `redirectUri` you specified plus an `redirectUri` parameter.

For the second call

1. Retrieve the code by following the previous `locationUrl`:
```csharp
var apcCode = "aad"; // WIP follow locationUrl
```
2. Create the number verification request content using the SDK class `NumberVerificationWithCodeContent`. Use the `apcCode` retrieved:
```csharp
NumberVerificationWithCodeContent numberVerificationWithCodeContent = new NumberVerificationWithCodeContent(apcCode);
```
3. Retrieve the verification result with the code `NumberVerificationWithCodeContent`. Use the `apcCode` retrieved:
```csharp
Response<NumberVerificationResult> numberVerificationResponse = await numberVerificationClient.VerifyWithCodeAsync(apcGatewayId, numberVerificationWithCodeContent);
Console.WriteLine(numberVerificationResponse.Value.VerificationResult);
```
![alt text](image-17.png)

##### HttpClient APC Complete Example
```csharp
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Core;

// See https://aka.ms/new-console-template for more information
// Simple console application to demonstrate API calls to Azure Programmable Connectivity using HTTP REST.
Console.WriteLine("Hello, APC HOL!");

// Endpoint and Gateway ID for your APC.
string baseUrl = "https://eastus.prod.apcgatewayapi.azure.com";
string apcGatewayId = "/subscriptions/65e6256a-defe-45dd-9137-caf300f71460/resourceGroups/APC-TEST/providers/Microsoft.programmableconnectivity/gateways/apc-turing-prv-01";
//"/subscriptions/your-subscription-id/resourceGroups/your-resource-group/providers/Microsoft.programmableconnectivity/gateways/your-gateway-name";

// Azure AD application's details for OAuth.
string clientId = "your-application-client-id";
string clientSecret = "your-application-client-secret";
string tenantId = "your-tenant-id";

// Authentication with Azure AD to obtain Bearer Token.
var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
var token = await credential.GetTokenAsync(new Azure.Core.TokenRequestContext(new[] { "https://management.azure.com/.default" }));
string accessToken = token.Token;

// Prepare the HttpClient with the Bearer token and common headers.
using var httpClient = new HttpClient();
httpClient.BaseAddress = new Uri(baseUrl);
httpClient.DefaultRequestHeaders.Add("apc-gateway-id", apcGatewayId);
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
httpClient.DefaultRequestHeaders.Add("x-ms-client-request-id", Guid.NewGuid().ToString()); // Maybe remove this and mention it in part 2?

// Example: Retrieve network information using a direct HTTP call.
string networkApiUrl = $"{baseUrl}/device-network/network:retrieve";
var networkIdentifier = new
    {
        identifierType = "IPv4",
        identifier = "176.83.74.44" // TODO not hardcode (this one returns Telefonica_Spain)
    };
var networkContent = new StringContent(JsonSerializer.Serialize(networkIdentifier), Encoding.UTF8, "application/json");

HttpResponseMessage networkResponse = await httpClient.PostAsync(networkApiUrl, networkContent);
var networkResult = await JsonSerializer.DeserializeAsync<NetworkRetrievalResult>(await networkResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions{PropertyNameCaseInsensitive = true});
Console.WriteLine($"Network retrieval result: {networkResult}");

// Example: Sim Swap verification using a direct HTTP call.
string simSwapApiUrl = $"{baseUrl}/sim-swap/sim-swap:verify";
var simSwapContent = new
{
    phoneNumber = "+34600000000",
    maxAgeHours = 240,
    networkCode = networkResult.networkCode
};
var simSwapRequestContent = new StringContent(JsonSerializer.Serialize(simSwapContent), Encoding.UTF8, "application/json");

HttpResponseMessage simSwapResponse = await httpClient.PostAsync(simSwapApiUrl, simSwapRequestContent);
var simSwapResult = await JsonSerializer.DeserializeAsync<SimSwapVerificationResult>(await simSwapResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Sim swap verification result: {simSwapResult.VerificationResult}");

// Example: Verify device location using a direct HTTP call.
string locationApiUrl = $"{baseUrl}/device-location/location:verify";
var locationContent = new
{
    networkIdentifier = new { networkCode = networkResult.networkCode },
    latitude = 40.7128,
    longitude = -74.0060,
    accuracy = 10,
    locationDevice = new { phoneNumber = "+34600000000" }
};
var locationRequestContent = new StringContent(JsonSerializer.Serialize(locationContent), Encoding.UTF8, "application/json");

HttpResponseMessage locationResponse = await httpClient.PostAsync(locationApiUrl, locationRequestContent);
var locationResult = await JsonSerializer.DeserializeAsync<DeviceLocationVerificationResult>(await locationResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
Console.WriteLine($"Device location verification result: {locationResult.VerificationResult}");

// Add additional API calls as needed.

// Number verification
// Use HttpCompletionOption.ResponseHeadersRead for stopping autoredirection on HTTP 302
//var response = await httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

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
```

### Additional APC REST HTTP examples using Postman

##### Postman APC Number Verification Request

1. Navigate to `number-verification > number:verify` request
2. Adjust the request payload in the `Body` tab with your data.
  ```json
  {
    "networkIdentifier": {
      "identifierType": "NetworkCode",
      "identifier": "your-network-code"
    },
    "phoneNumber": "your-phone-inc-countrycode",
    "redirectUri": "your-service-auth-callback"
  }
  ```
![alt text](image-22.png)

3. Go to the settings tab and make sure the setting `Automatically follow redirects` is set to OFF. Following this step, you will procceed to manually follow **three** 302 redirect calls. In a normal scenario these would befollowed automatically, refer to [Part 2: TODO LINk](#part-2-advanced-use-case---integrating-apc-into-a-banking-app) for real-word number verification example. 

![alt text](image-23.png)

4. Click Send and once it completes the result should be a HTTP `302` response with a Location header containing the next call in the number verification flow. Copy the url value for the `Location` header. 

![alt text](image-24.png)

5. **1/3 302 request**: Create a new request in a new tab and paste the url value from the step before. Make sure the `Automatically follow redirects` setting is OFF. Send the GET request and copy the next `Location` header value from the new 302 response.

![alt text](image-26.png)

5. **2/3 302 request**: Create a new request in a new tab and paste the url value from the step before. Make sure the `Automatically follow redirects` setting is OFF. Send the GET request and copy the next `Location` header value from the new 302 response.

![alt text](image-27.png)

5. **3/3 302 request**: Create a new request in a new tab and paste the url value from the step before. Make sure the `Automatically follow redirects` setting is OFF. Send the GET request and copy the query param named `apcCode` in the `Location` header value from the new 302 response.

![alt text](image-28.png)

6. Go back to and modify the original `number-verification > number:verify` request's payload with the following content, then click Send to retrieve the number verification result.

```json
{
    "apcCode": "your-apc-code-retrieved-in-step-5"
}
```
![alt text](image-29.png)

### Arch diagram
![Arch](imgs/004-apc-app-arch.jpg)
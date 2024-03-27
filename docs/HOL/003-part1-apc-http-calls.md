# Using Network APIs with APC REST APIs

This section covers how to interact with Azure Programmable Connectivity (APC) using direct HTTP calls. You'll learn to set up Postman for making authenticated requests, and how to construct these requests using .NET HttpClient in a console application.

## A. Testing with Postman (SIM Swap)

### Setup: Configuring Postman for Authenticated Requests to APC

To make authenticated requests to the APC API, you need to set up Postman with the correct authorization headers. Here are the steps to configure Postman:

1. Open Postman and create a new request.
2. Set the HTTP method to the one required by the APC API you want to test.
3. Input the URL for the APC API endpoint.
4. Go to the Authorization tab, select "Bearer Token," and input your token.
5. Add any necessary headers, such as `Content-Type: application/json`.
6. Add the request payload if required by the API endpoint.
7. Send the request and view the response.

   ![Postman Configuration](imgs/postman-configuration.jpg)

### API Calls: Sample API Calls to Test the Capabilities of APC

Here's an example of a Postman request setup to perform a SIM Swap check:

- **Method**: POST
- **URL**: `https://<apc-gateway-url>/sim-swap/check`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <Your-Access-Token>`
- **Body**:
  ```json
  {
    "phoneNumber": "+1234567890",
    "networkIdentifier": {
      "identifierType": "NetworkCode",
      "identifier": "network-code-here"
    }
  }

## B. Running APC REST APIs with .NET HttpClient

You can also use the .NET HttpClient to make authenticated calls to APC. Here's a basic example of how you can implement this in a .NET 8 console application:

```C#
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApcHttpClientDemo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var httpClient = new HttpClient();
            var requestUrl = "https://<apc-gateway-url>/sim-swap/check";
            
            var requestContent = new StringContent(
                JsonSerializer.Serialize(new
                {
                    phoneNumber = "+1234567890",
                    networkIdentifier = new { identifierType = "NetworkCode", identifier = "network-code-here" }
                }), System.Text.Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", "<Your-Access-Token>");

            var response = await httpClient.PostAsync(requestUrl, requestContent);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            Console.WriteLine($"Response Status: {response.StatusCode}");
            Console.WriteLine($"Response Body: {responseContent}");
        }
    }
}
```

- TODO: POSTMANL  Add annex link to Location + Number Verification with implementation details
- TODO: HTTP Client: Add annex link to Location + Number Verification with implementation details
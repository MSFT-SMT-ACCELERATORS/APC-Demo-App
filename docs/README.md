# APC-Demo-App
Mobile App with Cloud Service Demo consuming Azure Programmable Connectivity APIs with Telcos network APIs under the covers

## Architecture

This section provides a brief technical description of the demo application's architecture. The application is designed to interact with APC for enhanced anti-fraud security measures such as SIM swap detection, number verification, and user location verification.

![Architecture Diagram](image-13.png)

### Components

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
  - **Features**: Interfaces with mobile network operator APIs.

## Get Started

This section provides a step-by-step guide to get the project up and running on your local machine and mobile device.

### Prerequisites
Before starting, ensure you have the following installed:
- Git
- Node.js
- .NET 8 SDK
- Azure CLI (for deployment)
- An active Azure subscription

## APC Gateway deployment and configuration

#### Create APC Gateway Instance

* Follow the [guide](https://learn.microsoft.com/azure/programmable-connectivity/azure-programmable-connectivity-create-gateway) to create a gateway, or have one already.
* Once you are done creating the gateway, note down the APC Gateway resoruce id endpoint, as explained in this section.

Deploying an APC Gateway in Azure is a straightforward process that involves the following steps:

1. In the Azure portal, search for **APC Gateways** and then select **Create**.

   ![Search for APC Gateway](hol/imgs/001-01-set-up-portal-create.jpg)

2. Select your **Subscription**, **Resource Group**, and **Region**.

   ![Create APC Gateway](hol/imgs/001-02-set-up-portal-create-step1.jpg)

3. Provide a unique **Name** for your gateway and proceed to the next steps.

Once your gateway is created, you'll need to configure it:

1. Assign the telecom operator setup, selecting the SimSwap, Location and Number Verification APIs and plans.

2. Complete the application details, which will be shared with the operator for validation.

   ![Configure APC](hol/imgs/001-02-set-up-portal-create-step2.jpg)

3. Agree to the operators' terms and conditions to finalize the setup.

Now, note down relevant resource information for later steps:

1. Navigate to your APC Gateway resource in the Azure portal and copy the `resource Id` and the `endpoint` value:

![APC Gateway resource](hol/image-38.png)

#### Set up authentication

To authenticate and access the APC Gateway, create a Microsoft Entra application in the same directory or tenant.

1. Follow the instructions to [register an application with Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal), create a service principal and record the clientId and secret.
    1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) as at least a **Cloud Application Administrator**. 
    1. Browse to **Identity** > **Applications** > **App registrations** then select **New registration**.
    1. Name the application, for example "apc-hol-exercise". 
    1. Select a supported account type, which determines who can use the application. For the exercises in this lab it won´t matter since we are using a client credentials flow with Client Id and secret.
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


## Backend configuration and deployment

### Build and configure the backend service locally

For local testing and development, you will need to update up the `appsettings.Development.json` file with the necessary configurations:

```json
{
   "APCClientSettings": {
   "AuthAppCredentials": {
      "ClientId": "your-client-id",
      "TenantId": "your-tenant-id",
      "ClientSecret": "your-client-secret"
   },
   "GatewayId": "your-gateway-id",
   "BaseUri": "https://your-apc-endpoint"
   }
}
```

#### Run the backend locally

1. **Navigate to the Backend Service Directory**
   ```
   cd [Repo path]/APC.Proxy.API
   ```

2. **Build the Project**
   ```
   dotnet build
   ```

3. **Run the Backend Service**
   ```
   dotnet run --project APC.ProxyServer
   ```

4. **Open the swagger UI url int the browser for testing**. Make sure the port is correct and the uri is HTTP, not HTTPS.
   
   ![alt text](image-14.png)

   ```
      http://localhost:5009/swagger/index.html
   ```

   ![swagger](image-1.png)
   
### Deploy and configure the backend in Azure Cloud

#### Step 1: Create an Azure Web App

1. **Log in to the Azure Portal** at https://portal.azure.com.
2. **Navigate to "App Services"** and click on **+ Create** to start the process of creating a new app service.

![alt text](image-7.png)

3. **Select your subscription** and choose or create a new resource group.
4. **Enter the name** for your web app (e.g., `apc-hol-leavesbank-service`).
5. **Publish**: Select **Code** as the method to publish the application.
6. **Runtime stack**: Choose **.NET 8**.
7. **Operating System**: Select your preferred OS (Windows or Linux).
8. **Region**: Choose the region that is closest to your users or other services.
9. **Review and create**: Review the configuration details, then click **Create** to provision and deploy the web app.

![alt text](image-6.png)

#### Step 2: Configure Application Settings in Azure

1. **Navigate to your newly created App Service** in the Azure portal.
2. **Go to "Configuration"** under the Settings section and **Click on "New application setting"** to add each of the following settings. You'll need to add the relevant values for `ClientId`, `TenantId`, `ClientSecret`, `GatewayId`, and `BaseUri`:

   - `APCClientSettings__AuthAppCredentials__ClientId`
   - `APCClientSettings__AuthAppCredentials__TenantId`
   - `APCClientSettings__AuthAppCredentials__ClientSecret`
   - `APCClientSettings__GatewayId`
   - `APCClientSettings__BaseUri`

![alt text](image-11.png)

3. **Set CORS**: In the portal, navigate to "CORS" under the API section. Add `*` to allow all domains or specify your domain to restrict the cross-origin requests to your front end. **Save** the configurations to apply them,

![alt text](image-10.png)


#### Step 3: Deploy the Backend Code Using Azure CLI

Use an IDE such as [Visual Studio Code](https://learn.microsoft.com/en-us/aspnet/core/tutorials/publish-to-azure-webapp-using-vscode?view=aspnetcore-8.0#publish-to-azure), [Visual Studio](https://learn.microsoft.com/en-us/visualstudio/deployment/quickstart-deploy-aspnet-web-app?view=vs-2022&tabs=azure) or similar to deploy to the newly created web app or follow these steps to do it with Azure CLI:

1. **Navigate to your project directory** and publish your .NET application:
   ```
   dotnet publish -c Release -o ./publish
   ```

2. **Download the publish profile** from your App Service Overview in the Azure Portal under "Download publish profile".

![alt text](image-9.png)

3. **Deploy using the Azure CLI**:
   ```
   az webapp deploy --resource-group <your-resource-group> --name <your-app-name> --src-path ./publish --type zip --async true
   ```

4. Once done, **Open the swagger UI url int the browser for testing**
   ```
      https://localhost:7127/swagger/index.html
   ```

## Client app local Setup and Testing

### Build, configure and run the client app

To set up and run the project locally, follow these steps:

1. **Clone the Project**
   ```
   git clone https://github.com/MSFT-SMT-ACCELERATORS/APC-Demo-App.git
   ```

2. **Navigate to the React Native App Directory**
   ```
   cd [Repo path]/APC.MobileApp/ReactNative
   ```

3. **Install Dependencies**
   ```
   npm install
   ```

4. **Configure Environment Variables for Expo**
- Create a `.env` file in the root directory of the React Native project (*src/APC.MobileApp/ReactNative*)
- Add a variable named `API_URL` and set as value the Azure App Service uri for the backend service APC Proxy you deployed in an earlier step, or the local address for the locally running instance if you wish to test the backend locally.

  ```
  API_URL=your-app-service-uri
  ```

![FE env variables](image-8.png)

4. **Start the Application**
   ```
   npm start
   ```

6. **Open in a Web Browser**
- Once the process is complete, the Metro Bundler should running in your terminal, press `W` to open the app in your web browser. Use responsive mode when opening the developer console with F12.

![alt text](image-12.png)

![Dev Responsive](img/desktop.png)

### Run the app on Mobile

To test the app on a mobile device, follow these additional steps:

1. **Download Expo Go**
- Install the Expo Go application from your device's app store (available on iOS and Android).

2. **Scan QR Code**
- Open the Expo Go app on your mobile device.
- Select the option to scan the QR code.
- Scan the QR code that appears in your terminal after you've run `npm start` from the React Native app directory.

![QR Code](img/QR.png)
![Scan QR](img/scan.png)

This will open the app on your mobile device, allowing you to test its features in a mobile environment.

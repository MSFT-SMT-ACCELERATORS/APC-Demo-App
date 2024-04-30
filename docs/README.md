# APC-Demo-App
Mobile App with Cloud Service Demo consuming Azure Programmable Connectivity APIs with Telcos network APIs under the covers

## Architecture

This section provides a brief technical description of the demo application's architecture. The application is designed to interact with APC for enhanced anti-fraud security measures such as SIM swap detection, number verification, and user location verification.

![Architecture Diagram](hol/image-13.png)

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
   dotnet run
   ```

4. **Open the swagger UI url int the browser for testing**
   ```
      https://localhost:7127/swagger/index.html
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

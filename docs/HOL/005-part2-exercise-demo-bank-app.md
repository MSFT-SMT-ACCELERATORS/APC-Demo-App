
# APC-Demo-App
Mobile App with Cloud Service Demo consuming Azure Programmable Connectivity APIs with Telcos network APIs under the covers

## Components

### APC API
- **Location**: Cloud.
- **Functionality**: WIP

### APCProxyServer
- **Hosting**: Azure App Service API.
- **Role**: Acts as an intermediary between the React Native app and the APC API.
- **Responsibilities**: Authentication, request forwarding, and minimal data processing.

### React Native Application
- **Environment**: Client devices (smartphones).
- **Features**: Interaction demo with the APCProxyServer for APC interactions.
- **Technology**: Built using React Native and Expo Go.

## Repository Structure
- `/APCProxyServer`: Source code for the proxy server (.NET 8 with ASP.NET Core).
- `/APC.MobileApp/ReactNativeApp`: Source code for the React Native application.
- `/docs`: Documentation, including diagrams.
- `README.md`: Setup guide and project overview.


## Get Started (temporal)

This section provides a step-by-step guide to get the project up and running on your local machine and mobile device.

### Prerequisites
Before starting, ensure you have the following installed:
- Git
- Node.js

### Local Setup and Testing

To set up and run the project locally, follow these steps:

1. **Clone the Project**
   ```
   git clone [Repository URL]
   ```

2. **Navigate to the React Native App Directory**
   ```
   cd [Repo path]/APC.MobileApp/ReactNative
   ```

3. **Install Dependencies**
   ```
   npm install
   ```

4. **Start the Application**
   ```
   npm start
   ```

5. **Open in a Web Browser**
   - Once the Metro Bundler is running in your terminal, press `W` to open the app in your web browser. Use responsive mode when opening the developer console with F12.

![Dev Responsive](img/desktop.png)

### Mobile Testing

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



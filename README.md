# Azure Programmable Connectivity (APC) demo app and Hands-On-Lab (HOL) repository

Welcome to this Azure Programmable Connectivity (APC) learning material repository! 

In order to be able to use APC in your apps you curently need to [Sign up for the public preview of Azure Programmable Connectivity](https://aka.ms/APCpublicpreview). 

For an introduction to APC go to the Microsoft official docs here: [What is Azure Programmable Connectivity?](https://learn.microsoft.com/en-us/azure/programmable-connectivity/azure-programmable-connectivity-overview)

This repository contains valuable resources to help you understand and implement APC in your applications. It is divided into two main sections:

## 1. Hands-On Lab (HOL)

The Hands-On Lab provides a step-by-step guide to get you started with APC, from setting up your environment to using APC's powerful network APIs for SIM swap detection, location services, phone number verification, and more.

- **Location**: `/HOL/APC-HOL.md`
- **Contents**: Introduction to APC, APC SDK set up, APC Network APIs with APC SDK, REST HTTP Client/Postman and advanced implementation details.

To dive into the Hands-On Lab, [click here](./HOL/APC-HOL.md).

<a href="./HOL/APC-HOL.md">
<img width="400" alt="image" src="https://github.com/MSFT-SMT-ACCELERATORS/APC-Demo-App/assets/1712635/57b4152a-b8ec-4d9d-b11c-3a14ed68d924">
</a>

## 2. APC Demo Application

Source and instructions to build and deploy the APC Demo Application "Leaves Banking App" which showcases a real-life use case of leveraging APC Network APIs for anti fraud features into a banking application.

- **Readme location**: Guide for setting up and understanding the demo application can now be found at `/Demo-App/README.md`.
- **Source code**: find the client app and API modules in `/Demo-App/src/APC.MobileApp` and `/Demo-App/src/APC.Proxy.API`, respectively.

For more information on the APC Demo Application, [click here](/Demo-App/README.md).

![Leaves Bank app](/Demo-App/docs/imgs/main-image-2.png)


## Repository Structure

- `/Demo-App`: End-to-end APC demo app with a mobile app (iOS and Android support) developed with  React Native and a backend proxy service (.NET 8 with ASP.NET Core).

- `/Demo-Examples`: Simple APC code examples in C#, running as console-application, showcasing the several possible combinations between the available APC APIs consumed through the APC Client SDK or plain HTTP requests.

- `/HOL`: An comprehensive and extensive Hands-on-Lab (HOL) to get you started with APC, step by step.


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

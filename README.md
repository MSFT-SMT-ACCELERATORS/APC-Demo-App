# Azure Programmable Connectivity (APC) Repository

Welcome to the Azure Programmable Connectivity (APC) Demo App  repository! This repository contains valuable resources to help you understand and implement APC in your applications. It is divided into two main sections:


## 1. Hands-On Lab (HOL)

The Hands-On Lab provides a step-by-step guide to get you started with APC, from setting up your environment to using APC's powerful network APIs for SIM swap detection, location services, phone number verification, and more.

- **Location**: `/docs/HOL/README.md`
- **Contents**: Introduction to APC, APC SDK set up, APC Network APIs with APC SDK, REST HTTP Client/Postman and advanced implementation details.

To dive into the Hands-On Lab, [click here](./docs/HOL/README.md).

## 2. APC Demo Application

Source and instructions to build and deploy the APC Demo Application "Leaves Banking App" which showcases a real-life use case of leveraging APC Network APIs for anti fraud features into a banking application.

- **Readme location**: Guide for setting up and understanding the demo application can now be found at `/docs/APC-Demo-App/README.md`.
- **Source code**: find the client app and API modules in `/APC.MobileApp` and `/APC.Proxy.API`, respectively.

For more information on the APC Demo Application, [click here](./docs/README.md).

![Leaves Bank app](image-2.png)


## Repository Structure
- `/APCProxyServer`: Source code for the proxy server (.NET 8 with ASP.NET Core).
- `/APC.MobileApp/ReactNativeApp`: Source code for the React Native application.
- `/docs`: Setup guide and project overview and Hands on Lab (HOL) documentation.


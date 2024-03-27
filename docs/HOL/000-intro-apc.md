# Introduction to Azure Programmable Connectivity (APC)

## Overview of APC

Azure Programmable Connectivity (APC) is a transformative Azure service connecting cloud applications to mobile operator networks. It simplifies the use of telecommunications capabilities like SIM swap detection and location-based services through easy-to-implement APIs, fostering innovation across various sectors.

![APC Diagram](imgs/apc-diagram.jpg)

## Architecture
- App
- Custom BE service -(APC Proxy) - ex lang
- APC 
![APC Diagram](imgs/apc-arch-diagram.jpg)

## APC Planned Operator APIs

APC enables direct access to a range of operator APIs, designed to streamline complex telecom functionalities into developer-friendly services. Below is a table summarizing the planned operator APIs:

| API                 | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| SIM Swap Detection  | Allows detection of SIM card changes, crucial for fraud prevention in security-sensitive operations. |
| Number Verification | Verifies the authenticity of mobile numbers, enhancing trust and reducing spam.                |
| Location Services   | Provides network-based location data, ideal for location-sensitive applications.              |
| Quality of Service (QoS) | Ensures prioritized network traffic for essential services, maintaining performance standards. |
| Billing and Charging | Facilitates direct carrier billing capabilities, enabling seamless transactions.              |

Each API offers a unique set of functionalities, aligning with modern application needs and user expectations, propelling APC to the forefront of cloud-telecom integrations.

## Scenarios and Use Cases

The scope of APC extends to numerous scenarios, enabling enhanced security measures, real-time user engagement, and reliable communication services. Its ability to provide robust telecom functionalities through simple APIs opens new avenues for developers to create sophisticated and responsive applications.


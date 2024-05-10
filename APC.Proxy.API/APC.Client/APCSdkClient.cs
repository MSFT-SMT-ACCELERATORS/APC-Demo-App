using APC.DataModel;
using Azure;
using Azure.Communication.ProgrammableConnectivity;
using Azure.Core;
using Azure.Identity;
using Microsoft.Extensions.Options;
using System.Net;
using System.Text.Json;

using NetworkIdentifier = Azure.Communication.ProgrammableConnectivity.NetworkIdentifier;
using NumberVerificationWithCodeContent = Azure.Communication.ProgrammableConnectivity.NumberVerificationWithCodeContent;
using NumberVerificationWithoutCodeContent = Azure.Communication.ProgrammableConnectivity.NumberVerificationWithoutCodeContent;
using SimSwapRetrievalContent = Azure.Communication.ProgrammableConnectivity.SimSwapRetrievalContent;
using SimSwapVerificationContent = Azure.Communication.ProgrammableConnectivity.SimSwapVerificationContent;

namespace APC.Client
{
    public class APCSdkClient : IAPCClientDI
    {
        private readonly ProgrammableConnectivityClient _apcClient;
        private readonly string _apcGatewayId;

        public APCSdkClient(IOptions<APCClientSettings> settings)
        {
            _apcGatewayId = settings.Value.GatewayId;

            TokenCredential credential = new ClientSecretCredential(
                settings.Value.AuthAppCredentials.TenantId,
                settings.Value.AuthAppCredentials.ClientId,
                settings.Value.AuthAppCredentials.ClientSecret);

            _apcClient = new ProgrammableConnectivityClient(new Uri(settings.Value.BaseUri), credential);
        }

        public async Task<HttpResponseMessage> DeviceLocationVerifyAsync(DataModel.DeviceLocationVerificationContent request)
        {
            var content = new Azure.Communication.ProgrammableConnectivity.DeviceLocationVerificationContent(
                networkIdentifier: new (request.NetworkIdentifier.IdentifierType, request.NetworkIdentifier.Identifier),
                latitude: request.Latitude,
                longitude: request.Longitude,
                accuracy: request.Accuracy,
                device: new () { Ipv4Address = new (request.Device.Ipv4Address.Ipv4, request.Device.Ipv4Address.Port) });

            var deviceLocationClient = _apcClient.GetDeviceLocationClient();
            var response = await deviceLocationClient.VerifyAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }

        public async Task<HttpResponseMessage> DeviceNetworkRetrieveAsync(DataModel.NetworkIdentifier request)
        {
            var content = new NetworkIdentifier(request.IdentifierType, request.Identifier);

            var deviceNetworkClient = _apcClient.GetDeviceNetworkClient();
            var response = await deviceNetworkClient.RetrieveAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }

        public async Task<HttpResponseMessage> NumberVerificationVerifyAsync(DataModel.NumberVerificationWithoutCodeContent request)
        {
            var content = new NumberVerificationWithoutCodeContent(
                networkIdentifier: new(request.NetworkIdentifier.IdentifierType, request.NetworkIdentifier.Identifier),
                redirectUri: new Uri(request.RedirectUri));

            var numberVerificationClient = _apcClient.GetNumberVerificationClient();
            var response = await numberVerificationClient.VerifyWithoutCodeAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }
        public async Task<HttpResponseMessage> NumberVerificationCallbackVerifyAsync(DataModel.NumberVerificationWithCodeContent request)
        {
            var content = new NumberVerificationWithCodeContent(request.ApcCode);

            var numberVerificationClient = _apcClient.GetNumberVerificationClient();
            var response = await numberVerificationClient.VerifyWithCodeAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }

        public async Task<HttpResponseMessage> SimSwapRetrieveAsync(DataModel.SimSwapRetrievalContent request)
        {
            var content = new SimSwapRetrievalContent(new(request.NetworkIdentifier.IdentifierType, request.NetworkIdentifier.Identifier));

            var simSwapClient = _apcClient.GetSimSwapClient();
            var response = await simSwapClient.RetrieveAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }

        public async Task<HttpResponseMessage> SimSwapVerifyAsync(DataModel.SimSwapVerificationContent request)
        {
            var content = new SimSwapVerificationContent(new(request.NetworkIdentifier.IdentifierType, request.NetworkIdentifier.Identifier));

            var simSwapClient = _apcClient.GetSimSwapClient();
            var response = await simSwapClient.VerifyAsync(_apcGatewayId, content);
            return await CreateHttpResponseMessageAsync(response);
        }

        private Task<HttpResponseMessage> CreateHttpResponseMessageAsync<T>(T result)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonSerializer.Serialize(result), System.Text.Encoding.UTF8, "application/json"),
            };
            return Task.FromResult(response);
        }
    }
}

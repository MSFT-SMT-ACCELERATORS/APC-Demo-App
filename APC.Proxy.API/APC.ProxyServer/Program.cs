using APC.Client;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Required for HttpClientFactory
builder.Services.AddHttpClient();

// Bind the section of appsettings.json to the APCClientSettings class
builder.Services.Configure<APCClientSettings>(builder.Configuration.GetSection("APCClientSettings"));
builder.Services.Configure<APCMockSettings>(builder.Configuration.GetSection("APCMockSettings"));


// Register IAPCClient services

builder.Services.AddTransient<IAPCClient>(serviceProvider =>
{
    var env = Environment.GetEnvironmentVariable("APCImplementationType");
    switch (env)
    {
        case "Sdk":
            return new APCSdkClient(serviceProvider.GetRequiredService<IOptions<APCClientSettings>>());
        case "Rest":
            return new RestAPCClient(
                serviceProvider.GetRequiredService<IHttpClientFactory>(),
                serviceProvider.GetRequiredService<IOptions<APCClientSettings>>());
        case "Mock":
            return new APCMockService(serviceProvider.GetRequiredService<IOptions<APCMockSettings>>());
        default:
            throw new KeyNotFoundException("The APC implementation type is not recognized.");
    }
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using APC.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Required for HttpClientFactory
builder.Services.AddHttpClient("NoRedirectClient")
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
    {
        AllowAutoRedirect = false,
    });
// Bind the section of appsettings.json to the APCClientSettings class
builder.Services.Configure<APCClientSettings>(builder.Configuration.GetSection("APCClientSettings"));
builder.Services.Configure<APCMockSettings>(builder.Configuration.GetSection("MockSettings"));


// Register implementations for IAPCClient using SDK, HTTP and Mock
builder.Services.AddTransient<APCSdkClient>();
builder.Services.AddTransient<APCRestClient>();
builder.Services.AddTransient<APCMockClient>();

builder.Services.AddTransient<IAPCClient>(serviceProvider =>
{
    var env = Environment.GetEnvironmentVariable("APCImplementationType");
    switch (env)
    {
        case "Sdk":
            return serviceProvider.GetRequiredService<APCSdkClient>();
        case "Rest":
            return serviceProvider.GetRequiredService<APCRestClient>();
        case "Mock":
            return serviceProvider.GetRequiredService<APCMockClient>();
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
// Commented for demo purposes. Production environments should not expose Swagger.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

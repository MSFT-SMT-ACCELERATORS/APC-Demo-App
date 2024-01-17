using APC.Client;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Bind the section of appsettings.json to the APCClientSettings class
builder.Services.Configure<APCClientSettings>(builder.Configuration.GetSection("APCClientSettings"));
builder.Services.Configure<APCMockSettings>(builder.Configuration.GetSection("APCMockSettings"));


// Register APCClient and APCMockService
builder.Services.AddTransient<IAPCMockService, APCMockService>();
builder.Services.AddHttpClient<APCClient>((serviceProvider, httpClient) =>
{
    var settings = serviceProvider.GetRequiredService<IOptions<APCClientSettings>>().Value;
    httpClient.BaseAddress = new Uri(settings.APCBaseUri);
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

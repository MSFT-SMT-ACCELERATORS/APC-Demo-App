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


// Register APCClient and APCMockService
builder.Services.AddSingleton<IAPCMockService, APCMockService>();
builder.Services.AddScoped<IAPCClient, APCClient>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

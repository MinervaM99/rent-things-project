using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Owin.Logging;
using RentThingsAPI.Filters;
using System.Text;
using RentThingsAPI;
using Microsoft.EntityFrameworkCore;
using RentThingsAPI.Entities;
using RentThingsAPI.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Set up configuration
//builder.Configuration.AddJsonFile("appsettings.json", optional: false);
//builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true);
//builder.Configuration.AddEnvironmentVariables();

var frontendUrl = builder.Configuration.GetValue<string>("frontend-url");
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");


// Add services to the container.
builder.Services.AddControllers(options =>
{ 
	options.Filters.Add(typeof(MyExceptionFilter));
	options.Filters.Add(typeof(ParseBadRequest));
});
//builder.Services.AddAuthentication();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.WithOrigins(frontendUrl)
			.AllowAnyMethod()
			.AllowAnyHeader()
			.WithExposedHeaders(new string[] { "totalAmountOfRecords" });
	});
});


builder.Services.AddAutoMapper(cfg =>
{
	// Add your AutoMapper configuration here
	cfg.CreateMap<Category, CategoryDTO>().ReverseMap();
	cfg.CreateMap<CategoryCreationDTO, Category>();
});

builder.Services.AddLogging();
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

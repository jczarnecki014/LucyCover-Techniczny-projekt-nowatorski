using LucyCover___Backend.Services;
using LucyCover_Database;
using LucyCover_Database.Repository;
using LucyCover_Database.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORSE Settings

builder.Services.AddCors(option => {
    option.AddPolicy("LucyCoverFrontend",policyBuilder => {
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.WithOrigins("http://localhost:5173");
    });
});

//Database connection + Repositories
builder.Services.AddDbContext<DbConnection>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
//Autompaer configuration
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
//App services
builder.Services.AddScoped<IPatientService,PatientService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
}

app.UseCors("LucyCoverFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

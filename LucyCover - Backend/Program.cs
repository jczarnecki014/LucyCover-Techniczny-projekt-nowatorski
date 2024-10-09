using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using LucyCover___Backend.Automapper_DTO_Maps;
using LucyCover___Backend.Services;
using LucyCover_Database;
using LucyCover_Database.Repository;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.DTO_Modeles;
using LucyCover_Model.DTO_Modeles.Validators;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options => {
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORSE Settings

builder.Services.AddCors(option => {
    option.AddPolicy("LucyCoverFrontend",policyBuilder => {
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.WithOrigins("http://localhost:5173");
        policyBuilder.WithExposedHeaders("filename");
    });
});

//Database connection + Repositories
builder.Services.AddDbContext<DbConnection>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
//Autompaer configuration
/*builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());*/
builder.Services.AddAutoMapper(cfg => 
{
    var serviceProvider = builder.Services.BuildServiceProvider();
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();

    cfg.AddProfile(new Mapps(configuration));
});
//FluentValidator
builder.Services.AddScoped<IValidator<PatientDTO>,AddPatientDTOValidator>();
builder.Services.AddScoped<IValidator<DocumentationFirstVisitDTO>,DocumentationFirstVisitDTOValidator>();
builder.Services.AddScoped<IValidator<DocumentationNextVisitDTO>,DocumentationNextVisitDTOValidator>();
builder.Services.AddScoped<IValidator<RecommendationDetails_DTO>,RecommendationDetailsDTOValidator>();
builder.Services.AddScoped<IValidator<UpsertPatientSheduleDTO>,UpsertPatientScheduleDTOValidator>();
//MimeKit
builder.Services.AddTransient<IEmailService, EmailService>();
//App services
builder.Services.AddScoped<IPatientService,PatientService>();
builder.Services.AddScoped<IDocumentationService,DocumentationService>();
builder.Services.AddScoped<IRecommendationService,RecommendationService>();
builder.Services.AddScoped<IScheduleService,ScheduleService>();
builder.Services.AddScoped<IEducationMaterialsService,EducationMaterialsService>();
builder.Services.AddScoped<IMessagesService,MessagesService>();

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

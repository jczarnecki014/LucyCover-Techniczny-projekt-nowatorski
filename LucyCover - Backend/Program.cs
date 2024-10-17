using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using LucyCover___Backend.Automapper_DTO_Maps;
using LucyCover___Backend.MIddleware;
using LucyCover___Backend.Services;
using LucyCover_Database;
using LucyCover_Database.Repository;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.AuthModel;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.DTO_Modeles;
using LucyCover_Model.DTO_Modeles.Validators;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;


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
        policyBuilder.WithOrigins("https://localhost:5173");
        policyBuilder.WithExposedHeaders("filename");
        policyBuilder.AllowCredentials();
    });
});

//Database connection + Repositories
builder.Services.AddDbContext<DbConnection>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
//Autompaer configuration

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
builder.Services.AddScoped<IValidator<CreateAccountDTO>,CreateAccountDTOValidator>();
builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
//MimeKit
builder.Services.AddTransient<IEmailService, EmailService>();

//JwtBearer Token
AuthenticationSettings authSettings = new AuthenticationSettings();
builder.Configuration.GetSection("Jwt").Bind(authSettings);

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = authSettings.Issuer,
            ValidAudience = authSettings.Audience,

            /*!!!VERY IMPORTANT!!!
                    After deploy on production server this IssuerSigningKey MUST BE keeping in the more safe place!!!
                    This IssuerSigningKey should be set in OS locacal variables!
                    Keeping this code in visible place is very dangerous !!
                Storing IssuerSigningKey in following way is allowed only in developer mode.*/


            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSettings.Key)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
        o.Events = new JwtBearerEvents
        {
            OnMessageReceived = context => 
            {
                var token = context.Request.Cookies["token"];
                if(!String.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

//App services
builder.Services.AddScoped<IPatientService,PatientService>();
builder.Services.AddScoped<IDocumentationService,DocumentationService>();
builder.Services.AddScoped<IRecommendationService,RecommendationService>();
builder.Services.AddScoped<IScheduleService,ScheduleService>();
builder.Services.AddScoped<IEducationMaterialsService,EducationMaterialsService>();
builder.Services.AddScoped<IMessagesService,MessagesService>();
builder.Services.AddScoped<IPasswordHasher<User>,PasswordHasher<User>>();
builder.Services.AddScoped<IAuthenticationService,AuthenticationService>();
builder.Services.AddSingleton(authSettings);
builder.Services.AddHttpContextAccessor();

//Middleware
builder.Services.AddScoped<ExceptionHandler>();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
}

app.UseCors("LucyCoverFrontend");

app.UseMiddleware<ExceptionHandler>();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

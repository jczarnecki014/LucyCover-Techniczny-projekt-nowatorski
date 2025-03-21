﻿using LucyCover___Backend.Services;
using LucyCover_Database;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;
using System.Text;

namespace LucyCover___Tests.helpers
{
    public static class WebApplicationFactoryHelper
    {
        public static HttpContent ToJsonHttpContent(this object obj)
        {
            var json = JsonConvert.SerializeObject(obj);
            var httpContent = new StringContent(json,UnicodeEncoding.UTF8,"application/json");
            return httpContent;
        }

        public static WebApplicationFactory<T> ForTestPreconfigure<T>(this WebApplicationFactory<T> factory,string dbName) where T : class
        {
            var _factory = factory.WithWebHostBuilder(builder =>
            {   
                builder.ConfigureServices(services =>
                {
                    var dbContextOptions = services.SingleOrDefault(service => service.ServiceType == typeof(DbContextOptions<DbConnection>));
                    services.Remove(dbContextOptions);
                    services.AddDbContext<DbConnection>(options => options.UseInMemoryDatabase(dbName));
                    services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();

                    var serviceProvider = services.BuildServiceProvider();
                    var env = serviceProvider.GetService<IWebHostEnvironment>();
                    env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot");
                    Directory.CreateDirectory(env.WebRootPath);
                });
            });

            using var scope = _factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DbConnection>();
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

        return _factory;
        }

        public static WebApplicationFactory<T> ForTestPreconfigure<T>(this WebApplicationFactory<T> factory,string dbName, string fileDirectory) where T : class
        {   
            var newFactory = factory.WithWebHostBuilder(builder => {
                builder.ConfigureAppConfiguration((context,config) => {
                        config.AddInMemoryCollection(new Dictionary<string,string>
                        {
                            {"FileServerConfig:Directory", $"{fileDirectory}"} 
                        });

                    }); 
            });

            return newFactory.ForTestPreconfigure(dbName);
        }

        public static WebApplicationFactory<T> MockService<T,Y>(this WebApplicationFactory<T> factory, Mock<Y> mockedService) 
                                                                      where T : class where Y: class
        {
            var _factory = factory.WithWebHostBuilder(builder => 
            {
                builder.ConfigureServices(services => 
                {
                    services.AddSingleton<Y>(mockedService.Object);
                });
            });

            return _factory;
        }

        public static Y GetService<T,Y>(WebApplicationFactory<T> factory) where T : class where Y:class
        {
            using var scope = factory.Services.CreateScope();
            return scope.ServiceProvider.GetRequiredService<Y>();
        }
    }
}

using Bogus.DataSets;
using FluentAssertions;
using LucyCover___Tests.helpers;
using LucyCover_Database;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System.Reflection.Emit;
using System.Text;

namespace LucyCover___Tests.Controllers
{
    public class RecommendationController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        public RecommendationController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var dbContextOptions = services.SingleOrDefault(service => service.ServiceType == typeof(DbContextOptions<DbConnection>));
                    services.Remove(dbContextOptions);
                    services.AddDbContext<DbConnection>(options => options.UseInMemoryDatabase("TestDb"));
                    services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();
                });
            });

            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ GET ALL ------------------------------------------------ */

        [Fact]
        public async Task GetAll_ForPatientOwner_ReturnOk()
        {
            //arrange
            var fakePatient = GetPatient(_currentUser);
            //seed
            SeedDatabase(fakePatient);
            //act
            var response = await _client.GetAsync($"/api/recommendation/{fakePatient.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetAll_ForNotExistingPatient_ReturnNotFound()
        {
            //arrange
            var fakePatientId = new Guid();
            //act
            var response = await _client.GetAsync($"/api/recommendation/{fakePatientId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetAll_ForPatientNotAssignedToCurrentLoggedUser_RetunUnauthorized()
        {
            //arrange
            var fakeUserId = new Guid();
            var fakePatient = GetPatient(fakeUserId);
            //seed
            SeedDatabase(fakePatient);
            //act
            var response = await _client.GetAsync($"/api/recommendation/{fakePatient.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        /* ------------------------------------------------ GET RECOMENDATION DETAILS ------------------------------------------------ */

        [Fact]
        public async Task GetRecommendationDetails_ForExistingAndUserAssignedRecommendation_ReturnOk()
        {
            //arrange
            Patient fakePatient = GetPatient(_currentUser);
            SeedDatabase(fakePatient);

            Recommendation fakeRecommendation = GetRocommendation(fakePatient.id);
            SeedDatabase(fakeRecommendation);
            //act
            var response = await _client.GetAsync($"/api/recommendation/details/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetRecommendationDetails_ForNotExistingDocumentation_ReturnNotFound()
        {
            //arrange
            var fakeRecommendationId = new Guid();
            //act
            var response = await _client.GetAsync($"/api/recommendation/details/{fakeRecommendationId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetRecommendationDetails_ForNotCurrentUserAssignedPatient_ReturnUnauthorized()
        {
            //arrange
            Patient fakePatient = GetPatient(new Guid());
            SeedDatabase(fakePatient);

            Recommendation fakeRecommendation = GetRocommendation(fakePatient.id);
            SeedDatabase(fakeRecommendation);
            //act
            var response = await _client.GetAsync($"/api/recommendation/details/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        /* ------------------------------------------------ UPSERT NEW RECOMMENDATION ------------------------------------------------ */

        [Fact]
        public async Task UpsertNewRecommendation_ForValidRequest_ReturnOk()
        {
            //arrange
            var fakePatient = GetPatient(_currentUser);
            SeedDatabase(fakePatient);

            var newFakeRecommendation = GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{fakePatient.id}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        [Fact]
        public async Task UpsertNewRecommendation_ForInValidModel_ReturnBadRequest()
        {
            //arrange
            var fakePatient = GetPatient(_currentUser);
            SeedDatabase(fakePatient);

            var newFakeRecommendation = new RecommendationDetails_DTO()
            {
                patientFirstName = "test",
                patientLastName = "test",
            };

            //act
            var response = await _client.PostAsync($"/api/recommendation/{fakePatient.id}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        // TESTOWANIE VALIDATORA !!

        [Fact]
        public async Task UpsertNewRecommendation_ForNotExistingPatient_ReturnNotFound()
        {
            //arrange
            var notExistingPatientId = new Guid();

            var newFakeRecommendation = GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{notExistingPatientId}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpsertNewRecommendation_ForPatientNotAssignedToCurrentUser_ReturnUnauthorized()
        {
            //arrange
            var fakePatient = GetPatient(new Guid());
            SeedDatabase(fakePatient);

            var newFakeRecommendation = GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{fakePatient.id}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        /* ------------------------------------------------ UPSERT NEW RECOMMENDATION ------------------------------------------------ */

        [Fact]
        public async Task DeleteDocumentation_ForExistingDocumentation_ReturnNoContent()
        {
            //arrange
            var fakePatient = GetPatient(_currentUser);
            SeedDatabase(fakePatient);
            var fakeRecommendation = GetRocommendation(fakePatient.id);
            SeedDatabase(fakeRecommendation);
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task DeleteDocumentation_ForNotExistingDocumentation_ReturnNotFound()
        {
            //arrange
            var fakeRecommendationId = new Guid();
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendationId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task DeleteDocumentation_ForUserNotAssignedToPatient_ReturnNUnauthorized()
        {
            //arrange
            var fakePatient = GetPatient(new Guid());
            SeedDatabase(fakePatient);
            var fakeRecommendation = GetRocommendation(fakePatient.id);
            SeedDatabase(fakeRecommendation);
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        private T SeedDatabase<T>(T entity) where T : class
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using var scope = scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetService<DbConnection>();
            dbContext.Set<T>().Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        private Patient GetPatient(Guid userId)
        {
            return new Patient()
            {
                firstName = "test",
                lastName = "test",
                city = "test",
                address = "test",
                province = "test",
                zipCode = "test",
                phoneNumber = "test",
                email = "test",
                birthDate = "test",
                birthPlace = "test",
                userId = userId
            };
        }

        private RecommendationDetails_DTO GetRecommendationDetails_DTO()
        {
            return new RecommendationDetails_DTO()
            {
                title = "test",
                date = "test",
                text = "test",
            };
        }
        private Recommendation GetRocommendation(Guid userId)
        {
            return new Recommendation()
            {
                title = "test",
                text = "test",
                date = "test",
                patientId = userId
            };
        }

    }
}
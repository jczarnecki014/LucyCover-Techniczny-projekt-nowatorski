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
            _factory = factory.ForTestPreconfigure<Program>(nameof(RecommendationController_Tests));
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ GET ALL ------------------------------------------------ */

        [Fact]
        public async Task GetAll_ForPatientOwner_ReturnOk()
        {
            //arrange
            var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser);
            //seed
            fakePatient.SaveInDatabase(_factory);
            //act
            var response = await _client.GetAsync($"/api/recommendation/{fakePatient.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetAll_ForNotExistingPatient_ReturnNotFound()
        {
            //arrange
            var fakePatientId = Guid.NewGuid();
            //act
            var response = await _client.GetAsync($"/api/recommendation/{fakePatientId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetAll_ForPatientNotAssignedToCurrentLoggedUser_RetunUnauthorized()
        {
            //arrange
            var fakeUserId = Guid.NewGuid();
            var fakePatient = FakeEntitiesGenerator.GetPatient(fakeUserId);
            //seed
            fakePatient.SaveInDatabase(_factory);
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
            Patient fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser);
            fakePatient.SaveInDatabase(_factory);

            Recommendation fakeRecommendation = FakeEntitiesGenerator.GetRecommendation(fakePatient.id);
            fakeRecommendation.SaveInDatabase(_factory);
        //act
            var response = await _client.GetAsync($"/api/recommendation/details/{fakeRecommendation.id}");
        //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetRecommendationDetails_ForNotExistingDocumentation_ReturnNotFound()
        {
            //arrange
            var fakeRecommendationId = Guid.NewGuid();
            //act
            var response = await _client.GetAsync($"/api/recommendation/details/{fakeRecommendationId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetRecommendationDetails_ForNotCurrentUserAssignedPatient_ReturnUnauthorized()
        {
            //arrange
            Patient fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid());
            fakePatient.SaveInDatabase(_factory);

            Recommendation fakeRecommendation = FakeEntitiesGenerator.GetRecommendation(fakePatient.id);
            fakeRecommendation.SaveInDatabase(_factory);
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
            var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser);
            fakePatient.SaveInDatabase(_factory);

            var newFakeRecommendation = FakeEntitiesGenerator.GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{fakePatient.id}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        [Fact]
        public async Task UpsertNewRecommendation_ForInValidModel_ReturnBadRequest()
        {
            //arrange
            var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser);
            fakePatient.SaveInDatabase(_factory);

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

        [Fact]
        public async Task UpsertNewRecommendation_ForNotExistingPatient_ReturnNotFound()
        {
            //arrange
            var notExistingPatientId = Guid.NewGuid();

            var newFakeRecommendation = FakeEntitiesGenerator.GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{notExistingPatientId}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpsertNewRecommendation_ForPatientNotAssignedToCurrentUser_ReturnUnauthorized()
        {
            //arrange
            var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid());
            fakePatient.SaveInDatabase(_factory);

            var newFakeRecommendation = FakeEntitiesGenerator.GetRecommendationDetails_DTO();
            //act
            var response = await _client.PostAsync($"/api/recommendation/{fakePatient.id}", newFakeRecommendation.ToJsonHttpContent());
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        /* ------------------------------------------------ DELETE RECOMMENDATION ------------------------------------------------ */

        [Fact]
        public async Task DeleteRecommendation_ForExistingRecommendation_ReturnNoContent()
        {
            //arrange
            var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser);
            fakePatient.SaveInDatabase(_factory);

            var fakeRecommendation = FakeEntitiesGenerator.GetRecommendation(fakePatient.id);
            fakeRecommendation.SaveInDatabase(_factory);
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task DeleteRecommendation_ForNotExistingRecommendation_ReturnNotFound()
        {
            //arrange
            var fakeRecommendationId = Guid.NewGuid();
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendationId}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task DeleteRecommendation_ForUserNotAssignedToPatient_ReturnUnauthorized()
        {
            //arrange
            var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid());
            fakePatient.SaveInDatabase(_factory);
            var fakeRecommendation = FakeEntitiesGenerator.GetRecommendation(fakePatient.id);
            fakeRecommendation.SaveInDatabase(_factory);
            //act
            var response = await _client.DeleteAsync($"/api/recommendation/{fakeRecommendation.id}");
            //assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

    }
}
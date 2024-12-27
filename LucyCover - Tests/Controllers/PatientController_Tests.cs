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
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace LucyCover___Tests.Controllers
{
    public class PatientController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        public PatientController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure<Program>(nameof(PatientController_Tests));
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ Get Patients ------------------------------------------------ */

        [Fact]
        public async Task GetPatients_ForPatientsAssignedToCurrentLoggedUser_ReturnOkAndPatientsList()
        {
            //arrange
                FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync("api/patients");
                var responseContent = await response.Content.ReadAsStringAsync();
                var assignedPatients = JsonConvert.DeserializeObject<List<Patient>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                assignedPatients.Should().HaveCount(1);     
        }

        [Fact]
        public async Task GetPatients_ForPatientsNotAssignedToCurrentLoggedUser_ReturnOkAndPatientsList()
        {
            //arrange
                FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync("api/patients");
                var responseContent = await response.Content.ReadAsStringAsync();
                var assignedPatients = JsonConvert.DeserializeObject<List<Patient>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                assignedPatients.Should().HaveCount(0);     
        }

        /* ------------------------------------------------ Get Patient ------------------------------------------------ */

         [Fact]
         public async Task GetPatient_ForPatientAssignedToCurrentLoggedUser_ReturnOkAndPatientDetails()
         {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync($"api/patients/{fakePatient.id}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var assignedPatients = JsonConvert.DeserializeObject<Patient>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                assignedPatients.Should().NotBeNull();
                assignedPatients.Should().BeOfType<Patient>();
         }

         [Fact]
         public async Task GetPatient_ForNotExistPatient_ReturnNotFound()
         {
            //arrange

            //act
                var response = await _client.GetAsync($"api/patients/{Guid.NewGuid()}");
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
         }

         [Fact]
         public async Task GetPatient_ForPatientNotAssignedToCurrentLoggedUser_ReturnUnauthorized()
         {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync($"api/patients/{fakePatient.id}");
                var responseContent = await response.Content.ReadAsStringAsync();
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
            //
         }

         /* ------------------------------------------------ Upsert Patient ------------------------------------------------ */

         [Fact]
         public async Task UpsertPatient_Adding_ForValidRequest_ReturnCreated()
         {
            //arrange
                var fakePatientDTO = FakeEntitiesGenerator.GetPatientDTO().ToJsonHttpContent();
            //act
                var response = await _client.PostAsync($"api/patients", fakePatientDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
         }

         [Fact]
         public async Task UpsertPatient_ForInValidModel_ReturnCreated()
         {
            //arrange
                var fakePatientDTO = new PatientDTO() {address="test",birthDate="test"}.ToJsonHttpContent();
            //act
                var response = await _client.PostAsync($"api/patients", fakePatientDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
         }

         [Fact]
         public async Task UpsertPatient_Edit_ForValidModel_ReturnCreated()
         {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeUpdatePatient = FakeEntitiesGenerator.GetPatientDTO(fakePatient.id).ToJsonHttpContent();
            //act
                var response = await _client.PostAsync($"api/patients", fakeUpdatePatient);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
         }

         [Fact]
         public async Task UpsertPatient_Edit_ForPatientNotAssignedToCurrentUser_ReturnUnauthorized()
         {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeUpdatePatient = FakeEntitiesGenerator.GetPatientDTO(fakePatient.id).ToJsonHttpContent();
            //act
                var response = await _client.PostAsync($"api/patients", fakeUpdatePatient);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
         }

    }
}
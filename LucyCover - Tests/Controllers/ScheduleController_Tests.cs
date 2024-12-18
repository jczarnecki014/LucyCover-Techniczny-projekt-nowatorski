using FluentAssertions;
using LucyCover___Backend.Services;
using LucyCover___Backend.Utility;
using LucyCover___Tests.helpers;
using LucyCover_Database;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using Newtonsoft.Json;

namespace LucyCover___Tests.Controllers
{
    public class ScheduleController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        private Mock<IEmailService> _mailServiceMock = new Mock<IEmailService>();
        public ScheduleController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure("ScheduleDB")
                              .MockService(_mailServiceMock);
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ GET VISIT BY DATE ------------------------------------------------ */

        [Fact]
        public async void GetVisitsByDate_ForCurrentLoggedUser_ReturnOkWithVisits()
        {
            //arrange
                 var fakeSchedule = SeedTestSchedule(_currentUser, out Guid patientId);
            //act
                var response = await _client.GetAsync($"/api/schedule/{fakeSchedule.date}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var returnedVisits = JsonConvert.DeserializeObject<List<ScheduleDTO>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedVisits.Should().HaveCount(1);
        }

        [Fact]
        public async void GetVisitsByDate_ForNotCurrentLoggedUser_ReturnOkWithoutVisits()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(Guid.NewGuid(), out Guid patientId);
            //act
                var response = await _client.GetAsync($"/api/schedule/{fakeSchedule.date}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var returnedVisits = JsonConvert.DeserializeObject<List<ScheduleDTO>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedVisits.Should().HaveCount(0);
        }

        /* ------------------------------------------------ GET VISIT IN MONTH ------------------------------------------------ */

        [Fact]
        public async void GetVisitsInMonth_FotCurrentLoggedUser_ReturnOkWithFullDatesOfVisits()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(_currentUser, out Guid patientId);
                var fakeScheduleMonth = fakeSchedule.date.Substring(5,2); //Get month from date 2025.01.01
            //act
                var response = await _client.GetAsync($"/api/schedule/month/{fakeScheduleMonth}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var returnedVisits = JsonConvert.DeserializeObject<List<string>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedVisits.Should().HaveCount(1);
        }

        [Fact]
        public async void GetVisitsInMonth_FotNotCurrentLoggedUser_ReturnOkWithoutAnyDatesOfVisits()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(Guid.NewGuid(), out Guid patientId);
                var fakeScheduleMonth = fakeSchedule.date.Substring(5,2); //Get month from date 2025.01.01
            //act
                var response = await _client.GetAsync($"/api/schedule/month/{fakeScheduleMonth}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var returnedVisits = JsonConvert.DeserializeObject<List<string>>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedVisits.Should().HaveCount(0);
        }

        /* ------------------------------------------------ GET PATIENT VISITS ------------------------------------------------ */

        [Fact] 
        public async void GetPatientVisits_FotCurrentLoggedUser_ReturnOkWithPatientScheduleDTO()
        {
            //arrange
                SeedTestSchedule(_currentUser, out Guid patientId);
            //act
                var response = await _client.GetAsync($"/api/schedule/patients/{patientId}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<PatientScheduleDTO>(responseContent);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().BeOfType<PatientScheduleDTO>();
                returnedValue.patientVisits.Should().HaveCount(1);
        }

        [Fact] 
        public async void GetPatientVisits_FotNotCurrentLoggedUser_ReturnUnauthorizedWithoutPatientScheduleDTO()
        {
            //arrange
                SeedTestSchedule(Guid.NewGuid(), out Guid patientId);
            //act
                var response = await _client.GetAsync($"/api/schedule/patients/{patientId}");
                var responseContent = await response.Content.ReadAsStringAsync();
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact] 
        public async void GetPatientVisits_FotNotExistedPatient_ReturnNotFoundWithoutPatientScheduleDTO()
        {
            //arrange
                SeedTestSchedule(_currentUser, out Guid patientId);
                var fakePatientId = Guid.NewGuid();
            //act
                var response = await _client.GetAsync($"/api/schedule/patients/{fakePatientId}");
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        /* ------------------------------------------------ UPSERT PATIENT VISITS ------------------------------------------------ */

        [Fact] 
        public async void UpsertPatientVisit_ForLoggedUserExistingPatientAndValidModel_ReturnCreated()
        {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeUpsertScheduleDTO = FakeEntitiesGenerator.GetUpsertPatientSheduleDTO(fakePatient.id,fakeChildren.id).ToJsonHttpContent();
     
            //act
                var response = await _client.PostAsync($"/api/schedule/{fakePatient.id}",fakeUpsertScheduleDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        [Fact]
        public async void UpsertPatientVisit_ForLoggedUserExistingPatientAndInValidModel_ReturnBadRequest()
        {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeUpsertScheduleDTO = new UpsertPatientSheduleDTO 
                { 
                    patientId= fakePatient.id,
                    childId = fakeChildren.id,
                    city="test",
                    street="test",
                }.ToJsonHttpContent();
     
            //act
                var response = await _client.PostAsync($"/api/schedule/{fakePatient.id}",fakeUpsertScheduleDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async void UpsertPatientVisit_ForLoggedUserNotExistingPatientAndValidModel_ReturnBadRequest()
        {
            //arrange
                var fakePatientId = Guid.NewGuid();
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatientId).SaveInDatabase(_factory);
                var fakeUpsertScheduleDTO = FakeEntitiesGenerator.GetUpsertPatientSheduleDTO(fakePatientId,fakeChildren.id).ToJsonHttpContent();
     
            //act
                var response = await _client.PostAsync($"/api/schedule/{fakePatientId}",fakeUpsertScheduleDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async void UpsertPatientVisit_ForNotAuthorizedUserExistingPatientAndValidModel_ReturnBadRequest()
        {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeUpsertScheduleDTO = FakeEntitiesGenerator.GetUpsertPatientSheduleDTO(fakePatient.id,fakeChildren.id).ToJsonHttpContent();
     
            //act
                var response = await _client.PostAsync($"/api/schedule/{fakePatient.id}",fakeUpsertScheduleDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        /* ------------------------------------------------ CHANGE VISIT STATUS ------------------------------------------------ */

        [Fact]
        public async void ChageVisitStatus_ForValidRequest_ReturnOk()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(_currentUser, out Guid patientId);
                _mailServiceMock
                    .Setup(e => e.SendEmailAsync(It.IsAny<IEmailMessage>(),It.IsAny<string>()))
                    .Returns(Task.CompletedTask);
            //act
                var response = await _client.PutAsync($"/api/schedule/{fakeSchedule.id}?visitStatus={GlobalVariables.visitPlannedStatus}",null);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async void ChageVisitStatus_ForNotExistVisit_ReturnNotFound()
        {
            //arrange
                var fakeVisitId = Guid.NewGuid();
            //act
                var response = await _client.PutAsync($"/api/schedule/{fakeVisitId}?visitStatus={GlobalVariables.visitPlannedStatus}",null);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async void ChageVisitStatus_ForNotValidVisitStatus_ReturnNotFound()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(_currentUser, out Guid patientId);
            //act
                var response = await _client.PutAsync($"/api/schedule/{fakeSchedule.id}?visitStatus={Guid.NewGuid()}",null);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async void ChageVisitStatus_ForNotAuthorizedUser_ReturnUnauthorized()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(Guid.NewGuid(), out Guid patientId);
            //act
                var response = await _client.PutAsync($"/api/schedule/{fakeSchedule.id}?visitStatus={GlobalVariables.visitPlannedStatus}",null);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }


        /* ------------------------------------------------ DELETE PATIENT VISITS ------------------------------------------------ */

        [Fact]
        public async void DeletePatientVisit_ForValidRequest_ReturnNoContent()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(_currentUser,out Guid patientId);
            //act
                var response = await _client.DeleteAsync($"/api/schedule/{fakeSchedule.id}");
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
        }

        [Fact]
        public async void DeletePatientVisit_ForForNotAuthorizedUser_ReturnNoContent()
        {
            //arrange
                var fakeSchedule = SeedTestSchedule(Guid.NewGuid(),out Guid patientId);
            //act
                var response = await _client.DeleteAsync($"/api/schedule/{fakeSchedule.id}");
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async void DeletePatientVisit_ForNotExistVisit_ReturnNoFound()
        {
            //arrange
                var fakeScheduleId = Guid.NewGuid();
            //act
                var response = await _client.DeleteAsync($"/api/schedule/{fakeScheduleId}");
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        private Schedule SeedTestSchedule(Guid userId,out Guid patientId)
        {
                var fakePatient = FakeEntitiesGenerator.GetPatient(userId);
                fakePatient.SaveInDatabase(_factory);

                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id);
                fakeChildren.SaveInDatabase(_factory);

                var fakeSchedule = FakeEntitiesGenerator.GetSchedule(fakePatient.id,fakeChildren.id);
                fakeSchedule.SaveInDatabase(_factory);

                patientId = fakePatient.id;
                return fakeSchedule;
        }
    }
}
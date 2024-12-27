using Bogus.Bson;
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
using Microsoft.Extensions.Hosting;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;
using System.Text.Json;

namespace LucyCover___Tests.Controllers
{
    public class DocumentationController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        public DocumentationController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure<Program>(nameof(DocumentationController_Tests));
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ GET ALL ------------------------------------------------ */

        [Fact]
        public async Task GetAll_ForNotExistingPatient_ReturnNotFound()
        {
            //Arrange
                var fakePatientId = Guid.NewGuid();
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatientId}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetAll_ForPatientNotAssignedToUser_ReturnUnauthoried()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task GetAll_ForValidRequestWithExistDocuments_ReturnOkWithDocumentsList()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                FakeEntitiesGenerator.GetFirstVisitDocumentation(fakePatient.id,fakeChildren.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var documentationList = JsonSerializer.Deserialize<DocumentationList_DTO>(responseContent);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                documentationList.patient.id.Should().Be(fakePatient.id);
                documentationList.documentation.Should().HaveCount(1);
        }

        [Fact]
        public async Task GetAll_ForValidRequestWithoutExistDocuments_ReturnOkWithoutDocumentsList()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}");
                var responseContent = await response.Content.ReadAsStringAsync();
                var documentationList = JsonSerializer.Deserialize<DocumentationList_DTO>(responseContent);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                documentationList.patient.id.Should().Be(fakePatient.id);
                documentationList.documentation.Should().HaveCount(0);
        }

        /* ------------------------------------------------ GET DOCUMENTATION DETAILS ------------------------------------------------ */

        [Fact]
        public async Task GetDocumentationDetails_ForNotExistDocumentation_ReturnNotFound()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeDoucmentationId = Guid.NewGuid();
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}/{fakeDoucmentationId}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetDocumentationDetails_ForNotCurrentLoggedUser_ReturnUnauthorized()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeDoucmentation = FakeEntitiesGenerator.GetFirstVisitDocumentation(fakePatient.id,fakeChildren.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}/{fakeDoucmentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task GetDocumentationDetails_ForNotAssignedFirstOrNextVisitDetails_ReturnUnauthorized()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeDoucmentation = FakeEntitiesGenerator.GetDocumentation(fakePatient.id,fakeChildren.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}/{fakeDoucmentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetDocumentationDetails_ForValidRequest_FirstVisitDocumentation_ReturnOk()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeDoucmentation = FakeEntitiesGenerator.GetFirstVisitDocumentation(fakePatient.id,fakeChildren.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}/{fakeDoucmentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetDocumentationDetails_ForValidRequest_NextVisitDocumentation_ReturnOk()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildren = FakeEntitiesGenerator.GetChildren(fakePatient.id).SaveInDatabase(_factory);
                var fakeDoucmentation = FakeEntitiesGenerator.GetNextVisitDocumentation(fakePatient.id,fakeChildren.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/documentation/{fakePatient.id}/{fakeDoucmentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        /* ------------------------------------------------ UPSERT FIRST VISIT DOCUMENTATION ------------------------------------------------ */


        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForNotExistPatient_ReturnNotFound()
        {
            //Arrange
                var fakePatientId = Guid.NewGuid();
                var fakeChildId =Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationFirstVisit(fakeChildId,Guid.Empty).ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatientId}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForNotCurrentLoggedUser_ReturnUnauthorize()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);;
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationFirstVisit(fakeChildId,Guid.Empty).ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForNotValidUpsertDocumentationDTO_ReturnBadRequest()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeUpsertDocumentationDTO = new UpsertDocumentationDTO() 
                { 
                    Date = "test",
                    ChildId = "test", 
                    DocumentationId = Guid.Empty,
                    DocumentationFirstVisit = new DocumentationFirstVisitDTO()
                }.ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForPatientNotAssignToDocumentation_ReturnUnauthorize()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeExistingDocumentation = FakeEntitiesGenerator.GetFirstVisitDocumentation(Guid.NewGuid(),Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationFirstVisit(fakeChildId,fakeExistingDocumentation.id)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForValidAddNewDocumentation_ReturnCreated()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationFirstVisit(fakeChildId,Guid.Empty)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        [Fact]
        public async Task UpsertFirstVisitDocumentation_ForValidEditNewDocumentation_ReturnCreated()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeExistingDocumentation = FakeEntitiesGenerator.GetFirstVisitDocumentation(fakePatient.id,Guid.NewGuid());
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationFirstVisit(fakeChildId,fakeExistingDocumentation.id)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        /* ------------------------------------------------ UPSERT FIRST VISIT DOCUMENTATION ------------------------------------------------ */


        [Fact]
        public async Task UpsertNextVisitDocumentation_ForNotExistPatient_ReturnNotFound()
        {
            //Arrange
                var fakePatientId = Guid.NewGuid();
                var fakeChildId =Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationNextVisit(fakeChildId,Guid.Empty).ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatientId}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpsertNextVisitDocumentation_ForNotCurrentLoggedUser_ReturnUnauthorize()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);;
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationNextVisit(fakeChildId,Guid.Empty).ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task UpsertNextVisitDocumentation_ForNotValidUpsertDocumentationDTO_ReturnBadRequest()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeUpsertDocumentationDTO = new UpsertDocumentationDTO() 
                { 
                    Date = "test",
                    ChildId = "test", 
                    DocumentationId = Guid.Empty,
                    DocumentationNextVisit = new DocumentationNextVisitDTO()
                }.ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task UpsertNextVisitDocumentation_ForPatientNotAssignToDocumentation_ReturnUnauthorize()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeExistingDocumentation = FakeEntitiesGenerator.GetFirstVisitDocumentation(Guid.NewGuid(),Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationNextVisit(fakeChildId,fakeExistingDocumentation.id)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task UpsertNextVisitDocumentation_ForValidAddNewDocumentation_ReturnCreated()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);;
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationNextVisit(fakeChildId,Guid.Empty)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        [Fact]
        public async Task UpsertNextVisitDocumentation_ForValidEditNewDocumentation_ReturnCreated()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeExistingDocumentation = FakeEntitiesGenerator.GetNextVisitDocumentation(fakePatient.id,Guid.NewGuid());
                var fakeChildId = Guid.NewGuid();
                var fakeUpsertDocumentationDTO = FakeEntitiesGenerator.GetUpsertDocumentationDTOForDocumentationNextVisit(fakeChildId,fakeExistingDocumentation.id)
                                                                      .ToJsonHttpContent();
            //Act
                var response = await _client.PostAsync($"/api/documentation/{fakePatient.id}",fakeUpsertDocumentationDTO);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }

        /* ------------------------------------------------ DELETE DOCUMENTATION ------------------------------------------------ */

        [Fact]
        public async Task DeleteDocumentation_ForNotExistDocumentation_ReturnNotFound()
        {
            //Arrange
                var fakeDocumentationId = Guid.NewGuid();
            //Act
                var response = await _client.DeleteAsync($"/api/documentation/{fakeDocumentationId}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task DeleteDocumentation_ForNotCurrentLoggedUser_ReturnUnauthorized()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
                var fakeChildrenId = Guid.NewGuid();
                var fakeDocumentation = FakeEntitiesGenerator.GetDocumentation(fakePatient.id,fakeChildrenId).SaveInDatabase(_factory);
            //Act
                var response = await _client.DeleteAsync($"/api/documentation/{fakeDocumentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task DeleteDocumentation_ForValidRequest_ReturnNoContent()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeChildrenId = Guid.NewGuid();
                var fakeDocumentation = FakeEntitiesGenerator.GetDocumentation(fakePatient.id,fakeChildrenId).SaveInDatabase(_factory);
            //Act
                var response = await _client.DeleteAsync($"/api/documentation/{fakeDocumentation.id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
        }
    }
}
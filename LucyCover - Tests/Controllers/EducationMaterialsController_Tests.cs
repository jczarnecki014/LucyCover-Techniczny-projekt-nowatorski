using Bogus.DataSets;
using FluentAssertions;
using LucyCover___Backend.Services;
using LucyCover___Tests.helpers;
using LucyCover_Database;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace LucyCover___Tests.Controllers
{
    public class EducationMaterialsController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private IWebHostEnvironment _webHostEnviroment { get; set; }
        private Mock<IEmailService> _mailServiceMock = new Mock<IEmailService>();
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        private readonly string FileServerDirectory = "testUploads";
        public EducationMaterialsController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure<Program>(nameof(EducationMaterialsController_Tests),FileServerDirectory)
                              .MockService(_mailServiceMock);

            _client = _factory.CreateClient();
            _webHostEnviroment = WebApplicationFactoryHelper.GetService<Program,IWebHostEnvironment>(_factory);
            _mailServiceMock.Setup(e => e.SendEmailAsync(It.IsAny<IEmailMessage>(),It.IsAny<string>()))
                            .Returns(Task.CompletedTask);
        }


        /* ------------------------------------------------ GET ALL ------------------------------------------------ */

        [Fact]
        public async Task GetAll_ForCurrentLoggedUser_ReturnOkWithListOfEducationMaterials()
        {
            //Arrange
                var fakeEducationMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync("api/educationMaterials");
                var content = await response.Content.ReadAsStringAsync();
                var EducationMaterialList = JsonConvert.DeserializeObject<List<EducationMaterials>>(content);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                EducationMaterialList.Should().HaveCount(1);
                EducationMaterialList.First().Should().BeOfType<EducationMaterials>();
        }

        [Fact]
        public async Task GetAll_ForNotCurrentLoggedUser_ReturnOkWithoutAnyEducationMaterials()
        {
            //Arrange
                var fakeEducationMaterial = FakeEntitiesGenerator.GetEducationMaterials(Guid.NewGuid()).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync("api/educationMaterials");
                var content = await response.Content.ReadAsStringAsync();
                var EducationMaterialList = JsonConvert.DeserializeObject<List<EducationMaterials>>(content);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                EducationMaterialList.Should().HaveCount(0);
        }

        /* ------------------------------------------------ GET ASSIGNED PATIENTS ------------------------------------------------ */

        [Fact]
        public async Task GetAssignedPatient_ForExistEducationMaterial_ReturnOkWithListOfPatientDTO()
        {
            //Arrange
                var fakeEducationMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory);
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeAssign = FakeEntitiesGenerator.GetEducationMaterialsAssignedPatients(fakeEducationMaterial.Id,fakePatient.id).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/educationMaterials/{fakeEducationMaterial.Id}");
                var content = await response.Content.ReadAsStringAsync();
                var EducationMaterialList = JsonConvert.DeserializeObject<List<EducationMaterialsAssignedPatients>>(content);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                EducationMaterialList.Should().HaveCount(1);
        }

        [Fact]
        public async Task GetAssignedPatient_ForNotEducationMaterial_ReturnNotFoundWithoutAnyEntity()
        {
            //Arrange
                var fakeMaterial = Guid.NewGuid();
            //Act
                var response = await _client.GetAsync($"api/educationMaterials/{fakeMaterial}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        /* ------------------------------------------------ GET FILES------------------------------------------------ */

        [Fact]
        public async Task GetFiles_ForNotExistMaterial_ReturnNotFound()
        {
            //Arrange
                var fakeMaterialId = Guid.NewGuid();
            //Act
                var response = await _client.GetAsync($"api/educationMaterials/file/{fakeMaterialId}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetFiles_ForFileExistInDbButNotInBackend_ReturnNotFound()
        {
            //Arrange        
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser,filePath:"not/exist").SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/educationMaterials/file/{fakeMaterial.Id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task GetFiles_ForNotCurrentLoggedUser_ReturnNotFound()
        {
            //Arrange
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(Guid.NewGuid()).SaveInDatabase(_factory);
            //Act
                var response = await _client.GetAsync($"api/educationMaterials/file/{fakeMaterial.Id}");
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task GetFiles_ForCorrectRequest_ReturnOk()
        {
            var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,"testUploads2");
            var fileName = "text.txt";
            try 
            {
                //Arrange
                    var filePath = CreateFakeMaterial(uploadsDirectory, fileName);
                    var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser,filePath:filePath).SaveInDatabase(_factory);
                //Act
                    var response = await _client.GetAsync($"api/educationMaterials/file/{fakeMaterial.Id}");
                //Assert
                    response.Headers.Contains("filename").Should().BeTrue();
                    response.Content.Headers.ContentType.MediaType.Should().Be("application/octet-stream");
            }
            finally
            {
                DeleteFakeMaterials(uploadsDirectory);
            }
        }

        /* ------------------------------------------------ UPSERT MATERIAL  ------------------------------------------------ */

        [Fact]
        public async Task UpsertMaterial_ADD_ForValidRequest_ReturnCreated()
        {
            var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,FileServerDirectory);
            var fileName = "test";
            try
            {
                //Arrange
                    var formData = GetUpsertMaterialArgument("test value","test",fileName);
                //Act
                    var response = await _client.PostAsync($"api/educationMaterials",formData);
                    var responseContent = await response.Content.ReadAsStringAsync();
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
                    responseContent.Should().NotBeNull();
                    File.Exists(responseContent).Should().BeTrue();
            }
            finally {
                DeleteFakeMaterials(uploadsDirectory);
            }

        }

        [Fact]
        public async Task UpsertMaterial_ADD_ForEmptyFile_ReturnUnprocessableEntity()
        {
            var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,FileServerDirectory);
            var fileName = "test";
            try
            {
                //Arrange
                    var formData = GetUpsertMaterialArgument("","test",fileName);
                //Act
                    var response = await _client.PostAsync($"api/educationMaterials",formData);
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.UnprocessableEntity);
            }
            finally {
                DeleteFakeMaterials(uploadsDirectory);
            }
        }

        [Fact]
        public async Task UpsertMaterial_EDIT_ForValidRequest_ReturnCreate()
        {
            var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,FileServerDirectory);
            var fileName = "test.txt";
            try
            {
                //Arrange
                    var exitFilePath = CreateFakeMaterial(uploadsDirectory,fileName);
                    var educationMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser,exitFilePath).SaveInDatabase(_factory);

                    var updateFile = GetUpsertMaterialArgument("testTestTest","test","UpdatedFile",educationMaterial.Id);
                //Act
                    var response = await _client.PostAsync($"api/educationMaterials",updateFile);
                    var responseContent = await response.Content.ReadAsStringAsync();
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
                    responseContent.Should().NotBeNull();
                    File.Exists(responseContent).Should().BeTrue();
            }
            finally {
                DeleteFakeMaterials(uploadsDirectory);
            }
        }

        [Fact]
        public async Task UpsertMaterial_EDIT_ForNotCurrentLoggedUser_ReturnUnauthorized()
        {
            //Arrange
                var educationMaterial = FakeEntitiesGenerator.GetEducationMaterials(Guid.NewGuid()).SaveInDatabase(_factory);
                var updateFile = GetUpsertMaterialArgument("testTestTest","test","UpdatedFile",educationMaterial.Id);
            //Act
                var response = await _client.PostAsync($"api/educationMaterials",updateFile);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task UpsertMaterial_EDIT_ForNotExistMaterial_ReturnNotFound()
        {
            //Arrange
                var updateFile = GetUpsertMaterialArgument("testTestTest","test","UpdatedFile",Guid.NewGuid());
            //Act
                var response = await _client.PostAsync($"api/educationMaterials",updateFile);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

         /* ------------------------------------------------ SEND MATERIAL TO PATIENT  ------------------------------------------------ */

        [Fact]
        public async Task SendMaterialToPatient_ForNotExistPatient_ReturnNotFound()
        {
            //Arrange
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory);
                var fakePatientId = Guid.NewGuid();
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterial.Id}/{fakePatientId}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task SendMaterialToPatient_ForPatientNotAssignedToCurrentUser_ReturnUnauthorized()
        {
            //Arrange
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory);
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterial.Id}/{fakePatient.id}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task SendMaterialToPatient_ForNotExistMaterial_ReturnNotFound()
        {
            //Arrange
                var fakeMaterialId =Guid.NewGuid(); 
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterialId}/{fakePatient.id}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task SendMaterialToPatient_ForMaterialNotAssignedToCurrentUser_ReturnUnauthorized()
        {
            //Arrange
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(Guid.NewGuid()).SaveInDatabase(_factory); 
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterial.Id}/{fakePatient.id}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Theory]
        [InlineData("testtest.pl")]
        [InlineData("test@testpl")]
        [InlineData("testtest.pl")]
        [InlineData("@test.pl")]
        [InlineData("")]
        public async Task SendMaterialToPatient_ForNotValidPatientEmail_ReturnUnprocessableEntity(string fakeEmail)
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser,fakeEmail).SaveInDatabase(_factory);
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory); 
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterial.Id}/{fakePatient.id}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.UnprocessableEntity);
        }

        [Fact]
        public async Task SendMaterialToPatient_ForValidRequest_ReturnOk()
        {
            //Arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
                var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser).SaveInDatabase(_factory); 
            //Act
                var response = await _client.PostAsync($"api/educationMaterials/{fakeMaterial.Id}/{fakePatient.id}",null);
            //Assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

         /* ------------------------------------------------ DELETE MATERIAL  ------------------------------------------------ */

         [Fact]
         public async Task DeleteMaterial_ForNotExistMaterialInDb_ReturnNotFound()
         {
                //Arrange
                    var fakeMaterialId = Guid.NewGuid();
                //Act
                    var response = await _client.DeleteAsync($"api/educationMaterials/{fakeMaterialId}");
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
         }

         [Fact]
         public async Task DeleteMaterial_ForNotExistMaterialAsFile_ReturnNotFound()
         {
                //Arrange
                    var fakePath = Path.Combine(_webHostEnviroment.WebRootPath,$"FakeFolder-Test");
                    var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser,fakePath).SaveInDatabase(_factory);
                //Act
                    var response = await _client.DeleteAsync($"api/educationMaterials/{fakeMaterial.Id}");
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
         }

         [Fact]
         public async Task DeleteMaterial_ForUnauthorizedUser_ReturnNotFound()
         {
            var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,FileServerDirectory);
             try
             {
                //Arrange
                    var fakeFilePath = CreateFakeMaterial(uploadsDirectory,"test_file.txt");
                    var fakeUserId = Guid.NewGuid();
                    var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(fakeUserId,fakeFilePath).SaveInDatabase(_factory);
                //Act
                    var response = await _client.DeleteAsync($"api/educationMaterials/{fakeMaterial.Id}");
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
             }
             finally
             {
                DeleteFakeMaterials(uploadsDirectory);
             }
         }

         [Fact]
         public async Task DeleteMaterial_ForValidRequest_ReturnNoContent()
         {
             var uploadsDirectory = Path.Combine(_webHostEnviroment.WebRootPath,FileServerDirectory);
             try
             {
                //Arrange
                    var fakeFilePath = CreateFakeMaterial(uploadsDirectory,"test_file.txt");
                    var fakeMaterial = FakeEntitiesGenerator.GetEducationMaterials(_currentUser,fakeFilePath).SaveInDatabase(_factory);
                //Act
                    var response = await _client.DeleteAsync($"api/educationMaterials/{fakeMaterial.Id}");
                //Assert
                    response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
             }
             finally
             {
                if(Directory.Exists(uploadsDirectory))
                {
                    DeleteFakeMaterials(uploadsDirectory);
                }
             }
         }

        private string CreateFakeMaterial(string uploadsDirectory,string fileName)
        {
            if(!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            var filePath = Path.Combine(uploadsDirectory,fileName);
            using (var fileStream = File.Create(filePath)){ }

            return filePath;
        }
        private void DeleteFakeMaterials(string uploadsDirectory)
        {
            if(Directory.Exists(uploadsDirectory))
            {
                Directory.Delete(uploadsDirectory,true);
            }
        }
        private MultipartFormDataContent GetUpsertMaterialArgument(string streamValue, string fileTitle, string fileName,Guid? id = null)
        {
            
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(streamValue);
            writer.Flush();
            stream.Position = 0;

            var fileContent = new StreamContent(stream);
            fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("text/plain");

            var formData = new MultipartFormDataContent
            {
                { new StringContent(fileTitle), "title" },
                { new StringContent(fileName), "fileName" },
                { fileContent, "file", $"{fileName}.txt" }
            };

            if(id != null)
            {
                formData.Add(
                    new StringContent(id.ToString()), "id"
                );
            }

            return formData;
        }
    }
}

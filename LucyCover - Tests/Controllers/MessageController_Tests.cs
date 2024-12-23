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
using MimeKit;
using Moq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace LucyCover___Tests.Controllers
{
    public class MessageController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        private Mock<IEmailService> _emailServiceMock = new Mock<IEmailService>();
        public MessageController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure<Program>("MessageDB").MockService(_emailServiceMock);
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ GET PATIENT LIST ------------------------------------------------ */

        [Fact]
        public async void GetPatientList_ForCurrentLoggedUser_ReturnOkWithPatientMessageListElementDTOList()
        {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(_currentUser).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync("api/messages/patientsList");
                var content = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<List<PatientMessageListElementDTO>>(content);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().HaveCount(1);
                returnedValue.Should().BeOfType<List<PatientMessageListElementDTO>>();
        }

        [Fact]
        public async void GetPatientList_ForNotCurrentLoggedUser_ReturnOkWithPatientMessageListElementDTOList()
        {
            //arrange
                var fakePatient = FakeEntitiesGenerator.GetPatient(Guid.NewGuid()).SaveInDatabase(_factory);
            //act
                var response = await _client.GetAsync("api/messages/patientsList");
                var content = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<List<PatientMessageListElementDTO>>(content);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().HaveCount(0);
        }

        /* ------------------------------------------------ GET PATIENT EMAILS ------------------------------------------------ */

        [Fact]
        public async void GetPatientEmails_ForDefaultEmailAndOneMimeMessage_ReturnOkAndEmailMessageDTODTOList()
        {
            //arrange
                 var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress("Test sender","test@test.com"));
                mimeMessage.Subject = "Test Subject";
                mimeMessage.Body = new TextPart("plain"){ Text = "test body"};

                var mimeMessageList = new List<MimeMessage>{mimeMessage};
                _emailServiceMock.Setup(
                    e => e.ReciveEmailsAsync(It.IsAny<string>())
                )
                .ReturnsAsync(mimeMessageList);
            //act
                var response = await _client.GetAsync("api/messages?patientEmail=test2@test.pl");
                var content = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<List<EmailMessageDTO>>(content);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().HaveCount(1);
                returnedValue.First().Should().BeOfType<EmailMessageDTO>();
        }

        [Fact]
        public async void GetPatientEmails_ForDefaultEmailAndNoMimeMessage_ReturnOkAndEmptyList()
        {
            //arrange
                _emailServiceMock.Setup(
                    e => e.ReciveEmailsAsync(It.IsAny<string>())
                )
                .ReturnsAsync(new List<MimeMessage>());
            //act
                var response = await _client.GetAsync("api/messages?patientEmail=test2@test.pl");
                var content = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<List<EmailMessageDTO>>(content);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().HaveCount(0);
        }
        
        /* ------------------------------------------------ SEND EMAIL TO PATIENT ------------------------------------------------ */

        [Fact]
        public async void SendEmailToPatient_ForAnyPatientEmailAndMessage_ReturnEmailMessageDTO()
        {
            //arrange
                _emailServiceMock.Setup(
                    e => e.SendEmailAsync(It.IsAny<IEmailMessage>(),It.IsAny<string>())
                    )
                    .Returns(Task.CompletedTask);
                var patientEmail = "test2@test.pl";
                var message = "test test test test";
            //act
                var response = await _client.PostAsync("api/messages?patientEmail=test2@test.pl",message.ToJsonHttpContent());
                var content = await response.Content.ReadAsStringAsync();
                var returnedValue = JsonConvert.DeserializeObject<EmailMessageDTO>(content);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                returnedValue.Should().BeOfType<EmailMessageDTO>();
                returnedValue.message.Should().Be(message);
        }


    }
}

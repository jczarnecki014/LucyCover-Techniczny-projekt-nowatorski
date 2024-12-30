using FluentAssertions;
using LucyCover___Backend.ExtensionMethods;
using LucyCover___Tests.helpers;
using LucyCover_Database;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace LucyCover___Tests.Controllers
{
    public class AuthController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        private WebApplicationFactory<Program> _factory { get; set; }
        public AuthController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {   
                builder.ConfigureServices(services =>
                {
                    var dbContextOptions = services.SingleOrDefault(service => service.ServiceType == typeof(DbContextOptions<DbConnection>));
                    services.Remove(dbContextOptions);
                    services.AddDbContext<DbConnection>(options => options.UseInMemoryDatabase(nameof(AuthController_Tests)));
                });
            });

            using var scope = _factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DbConnection>();
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            _client = _factory.CreateClient();
        }
        
         /* ------------------------------------------------ LOGIN USER ------------------------------------------------ */

        [Fact]
        public async Task LoginUser_ForNotExistingUserInDb_ReturnBadRequest()
        {
            //arrange
                FakeEntitiesGenerator.GetUser("test@test.pl","test1234").SaveInDatabase(_factory);
                var fakeUserEmail = "tttt@www.pl";

                var fakeLoginUserDTO = new LoginUserDTO
                { Email = fakeUserEmail,
                  Password = "test1234"
                }.ToJsonHttpContent();

                
            //act
                var response = await _client.PostAsync("api/auth/login",fakeLoginUserDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task LoginUser_ForProvidedNotCorrectPassword_ReturnUnauthorized()
        {
            //arrange
                FakeEntitiesGenerator.GetUser("test@test.pl","test1234").SaveInDatabase(_factory);

                var fakeLoginUserDTO = new LoginUserDTO
                { Email = "test@test.pl",
                  Password = "test"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/login",fakeLoginUserDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task LoginUser_ForValidCredentials_ReturnOk()
        {
            //arrange
                FakeEntitiesGenerator.GetUser("test@test.pl","test1234".AddSalt(IDatabaseAdditionalOptions.DefaultPasswordSalt)).SaveInDatabase(_factory);

                var fakeLoginUserDTO = new LoginUserDTO
                { Email = "test@test.pl",
                  Password = "test1234"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/login",fakeLoginUserDTO);
                var responseContent = await response.Content.ReadAsStringAsync();
                var responseDTO = JsonConvert.DeserializeObject<AuthenticatedResponseDTO>(responseContent);
                var setCookieHeader = response.Headers.GetValues("Set-Cookie").FirstOrDefault();

            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
                responseDTO.Should().NotBeNull();
                responseDTO.userName.Should().NotBeNullOrEmpty();

                setCookieHeader.Should().NotBeNull();
                setCookieHeader.Should().Contain("token=");
        }

         /* ------------------------------------------------ CREATE ACCOUNT ------------------------------------------------ */

        [Fact]
        public async Task CreateAccount_ForInvalidModel_ReturnBadRequest()
        {
            //arrange
                var createAccountDTO = new CreateAccountDTO
                {
                    email = "test@wp.pl",
                    password = "test"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/createAccount",createAccountDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        public async Task CreateAccount_ForToEassyPassword_ReturnBadRequest()
        {
            //arrange
                var createAccountDTO = new CreateAccountDTO
                {
                    email = "test@test.pl",
                    password = "test123",
                    repassword = "test1234",
                    firstAndLastName = "test test"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/createAccount",createAccountDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task CreateAccount_ForExistUserWithProvidedEmail_ReturnConflict()
        {
            //arrange
                FakeEntitiesGenerator.GetUser("test@test.pl","test1234").SaveInDatabase(_factory);
                var createAccountDTO = new CreateAccountDTO
                {
                    email = "test@test.pl",
                    password = "Test1234!@",
                    repassword = "Test1234!@",
                    firstAndLastName = "test test"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/createAccount",createAccountDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.Conflict);
        }

        [Fact]
        public async Task CreateAccount_ForValidModel_ReturnOk()
        {
            //arrange
                var createAccountDTO = new CreateAccountDTO
                {
                    email = "test@test.pl",
                    password = "Test1234!@",
                    repassword = "Test1234!@",
                    firstAndLastName = "test test"
                }.ToJsonHttpContent();

            //act
                var response = await _client.PostAsync("api/auth/createAccount",createAccountDTO);
            //assert
                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }
    }
}
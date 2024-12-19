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
    public class MessageController_Tests : IClassFixture<WebApplicationFactory<Program>>
    {
        private HttpClient _client { get; set; }
        private WebApplicationFactory<Program> _factory { get; set; }
        private Guid _currentUser { get; set; } = ITestUserDetails.Id;
        public MessageController_Tests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.ForTestPreconfigure<Program>("MessageDB");
            _client = _factory.CreateClient();
        }

        /* ------------------------------------------------ Get Patients ------------------------------------------------ */

        
    }
}
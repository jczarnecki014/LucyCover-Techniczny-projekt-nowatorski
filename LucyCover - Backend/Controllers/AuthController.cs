using FluentValidation.Results;
using LucyCover___Backend.Services;
using LucyCover_Model.AuthModel;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace LucyCover___Backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthenticationService _service { get; set; }
        private AuthenticationSettings _authSettings { get; set; }
        public AuthController(IAuthenticationService service,AuthenticationSettings authSettings) 
        {
            _service = service;
            _authSettings = authSettings;
        }

        [AllowAnonymous]
        [Route("login")]
        [HttpPost()]
        public ActionResult LoginUser([FromBody] LoginUserDTO authDetails)
        {
            string token = _service.GetJwtToken(authDetails, out string userName);
            DateTime tokenExpires = DateTime.UtcNow.AddMinutes(Double.Parse(_authSettings.ExpireMinutes));

            Response.Cookies.Append("token",token,new CookieOptions 
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = tokenExpires
            });
            return Ok(new AuthenticatedResponseDTO 
            {
                isAuthenticated = true,
                userName= userName,
                TokenTime = tokenExpires,
            });
        }

        [AllowAnonymous]
        [Route("createAccount")]
        [HttpPost()]
        public ActionResult CreateAccount([FromBody] CreateAccountDTO createAccountDTO)
        {

            _service.CreateAccount(createAccountDTO);
            return Ok();
        }

        [Authorize]
        [Route("logout")]
        [HttpPost()]
        public ActionResult Logout() 
        {
            Response.Cookies.Delete("token");
            return Ok();
        }
    }
}

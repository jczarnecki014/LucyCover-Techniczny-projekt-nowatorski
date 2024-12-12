using AutoMapper;
using LucyCover___Backend.Exceptions;
using LucyCover___Backend.ExtensionMethods;
using LucyCover_Database;
using LucyCover_Database.Repository;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.AuthModel;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Parameters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;

namespace LucyCover___Backend.Services
{
    public interface IAuthenticationService
    {
        public string GetJwtToken(LoginUserDTO authDetails,out string userName );
        public void CreateAccount(CreateAccountDTO createAccountDTO);
        public Guid GetCurrentUserId();
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authSettings;
        private readonly string userPassSalt = IDatabaseAdditionalOptions.DefaultPasswordSalt;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public AuthenticationService(IUnitOfWork unitOfWork, IPasswordHasher<User> passwordHasher, AuthenticationSettings authSettings,IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
            _authSettings = authSettings;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public string GetJwtToken(LoginUserDTO authDetails,out string? userName )
        {
            User user = _unitOfWork.users.GetFirstOfDefault(e => e.email == authDetails.Email);

            if (user is null)
            {
                throw new BadHttpRequestException("User does not exist in system !");
            }

            var resoult = _passwordHasher.VerifyHashedPassword(user, user.password, authDetails.Password.AddSalt(userPassSalt));

            if (resoult == PasswordVerificationResult.Failed)
            {
                throw new InvalidCredentialException("Supplied password is not correct");
            }

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,user.id.ToString()),
                new Claim(ClaimTypes.Name,user.email),
                new Claim("FirstName",user.firstName),
                new Claim("LastName", user.lastName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.Key));
            var cred = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(Double.Parse(_authSettings.ExpireMinutes));

            var token = new JwtSecurityToken
            (
                issuer: _authSettings.Issuer,
                audience: _authSettings.Audience,
                claims: claims,
                expires:expires,
                signingCredentials: cred
            );

            var TokenHandler = new JwtSecurityTokenHandler();

            userName = $"{user.firstName} {user.lastName}";

            return TokenHandler.WriteToken(token);

        }

        public void CreateAccount(CreateAccountDTO createAccountDTO)
        {
            bool userExist = _unitOfWork.users.Any(u => u.email == createAccountDTO.email);
            if(userExist) throw new EntityAlreadyExistException("User with that email already exist !");

            User newUser = new User();
            newUser.email = createAccountDTO.email;
            newUser.password = _passwordHasher.HashPassword(newUser,createAccountDTO.password.AddSalt(userPassSalt));
            newUser.firstName = createAccountDTO.firstAndLastName.Split(' ')[0];
            newUser.lastName = createAccountDTO.firstAndLastName.Split(' ')[1];
            
            _unitOfWork.users.Add(newUser);
            _unitOfWork.Save();
        }

        public Guid GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext.User;
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);

            if(userIdClaim is null) 
            {
                throw new UnauthorizedAccessException();
            }

            return Guid.Parse(userIdClaim.Value);
        }

    }
}

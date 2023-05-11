using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RentThingsAPI.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RentThingsAPI.Controllers
{
	[ApiController]
	[Route("api/accounts")]
	public class AccountsController : ControllerBase
	{
		//gestionează operațiunile cu utilizatorii, cum ar fi crearea, citirea, actualizarea și ștergerea
		public UserManager<IdentityUser> userManager { get; }

		// gestionează autentificarea și deconectarea utilizatorilor
		public SignInManager<IdentityUser> signInManager { get; }
		public IConfiguration configuration { get; }

		public AccountsController(UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			IConfiguration configuration)
		{
			userManager = userManager;
			signInManager = signInManager;
			configuration = configuration;
		}


		[HttpPost("create")]
		public async Task<ActionResult<AuthenticationResponse>> Create(
		 [FromBody] UserCredentials userCredentials)
		{
			var user = new IdentityUser { UserName = userCredentials.Email, Email = userCredentials.Email };
			var result = await userManager.CreateAsync(user, userCredentials.Password);

			if (result.Succeeded)
			{
				return BuildToken(userCredentials);
			}
			else
			{
				return BadRequest(result.Errors);
			}
		}


		[HttpPost("login")]
		public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials userCredentials)
		{
			var result = await signInManager.PasswordSignInAsync(userCredentials.Email,
				userCredentials.Password, isPersistent: false, lockoutOnFailure: false);
			if(result.Succeeded)
			{
				return BuildToken(userCredentials);
			}else
			{
				return BadRequest("Incorrect user or password");
			}
		}
		
		//Method for building the token returned after registration
		private AuthenticationResponse BuildToken (UserCredentials userCredentials)
		{
			var claims = new List<Claim>()
			{
				//do not put here sensitive information
				new Claim("email", userCredentials.Email)
			};
			//building the jwb
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var expiration = DateTime.UtcNow.AddDays(30);

			//create the token
			var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, 
				expires: expiration, signingCredentials: creds);

			return new AuthenticationResponse
			{
				Token = new JwtSecurityTokenHandler().WriteToken(token),
				Expiration = expiration
			};

		}
	}
}

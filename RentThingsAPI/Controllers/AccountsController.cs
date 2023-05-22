using AutoMapper;
using Azure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RentThingsAPI.DTOs;
using RentThingsAPI.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace RentThingsAPI.Controllers
{
	[ApiController]
	[Route("api/accounts")]
	public class AccountsController : ControllerBase
	{
		private readonly UserManager<IdentityUser> userManager;
		private readonly SignInManager<IdentityUser> signInManager;
		private readonly IConfiguration configuration;

		public AccountsController(UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			IConfiguration configuration)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.configuration = configuration;
		}

		[HttpPost("create")]
		public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCredentials userCredentials)
		{
			var user = new IdentityUser { UserName = userCredentials.UserName, Email = userCredentials.Email, PhoneNumber = userCredentials.PhoneNumber, EmailConfirmed = false };
			var result = await userManager.CreateAsync(user, userCredentials.Password);

			if (result.Succeeded)
			{
				return await BuildToken(user);
			}
			else
			{
				return BadRequest(result.Errors);
			}
		}

		[HttpPost("login")]
		public async Task<ActionResult<AuthenticationResponse>> Login(
			[FromBody] LoginCredentials userCredentials)
		{

			var result = await signInManager.PasswordSignInAsync(userCredentials.Email,
				userCredentials.Password, isPersistent: false, lockoutOnFailure: false);


			if (result.Succeeded)
			{
				var user = await userManager.FindByNameAsync(userCredentials.Email);
				return await BuildToken(user);
			}
			else
			{
				return BadRequest("Incorrect Login");
			}
		}

		//private async Task<AuthenticationResponse> BuildToken(UserCredentials userCredentials)
		//{
		//	var claims = new List<Claim>()
		//	{
		//		new Claim("email", userCredentials.Email)
		//	};

		//	var userCredentials = await userManager.FindByNameAsync(userCredentials.Email);
		//	var claimsDB = await userManager.GetClaimsAsync(userCredentials);

		//	claims.AddRange(claimsDB);

		//	var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
		//	var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		//	var expiration = DateTime.UtcNow.AddYears(1);

		//	var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
		//		expires: expiration, signingCredentials: creds);

		//	return new AuthenticationResponse()
		//	{
		//		Token = new JwtSecurityTokenHandler().WriteToken(token),
		//		Expiration = expiration
		//	};
		//}

		private async Task<AuthenticationResponse> BuildToken(IdentityUser userCredentials)
		{
			var user = await userManager.FindByEmailAsync(userCredentials.Email);
			if (user == null)
			{
				// Tratează cazul în care utilizatorul nu este găsit în baza de date
				// și ia măsuri corespunzătoare, cum ar fi returnarea unei erori sau a unui mesaj de avertizare.
				// În acest exemplu, vom returna o valoare nulă pentru token și data de expirare.
				return null;
			}

			var claims = new List<Claim>()
			{
				new Claim("email", user.Email)
			};

			var userClaims = await userManager.GetClaimsAsync(user);
			claims.AddRange(userClaims);

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var expiration = DateTime.UtcNow.AddYears(1);

			var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
				expires: expiration, signingCredentials: creds);

			return new AuthenticationResponse()
			{
				Token = new JwtSecurityTokenHandler().WriteToken(token),
				Expiration = expiration
			};
		}
	}
}

using AutoMapper;
using Azure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RentThingsAPI.DTOs;
using RentThingsAPI.Entities;
using RentThingsAPI.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Runtime.CompilerServices;
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
		private readonly ApplicationDbContext context;
		private readonly IMapper mapper;

		public AccountsController(UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			IConfiguration configuration, ApplicationDbContext context, IMapper mapper)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.configuration = configuration;
			this.context = context;
			this.mapper = mapper;
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

		//get all users
		[HttpGet("listUsers")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult<List<UserDTO>>> GetListUsers([FromQuery] PaginationDTO paginationDTO)
		{
			var queryable = context.Users.AsQueryable();
			// queryable = queryable.Where(user => !userManager.IsInRoleAsync(user, "admin").Result);

			await HttpContext.InsertParametersPaginationInHeader(queryable);
			var users = await queryable.OrderBy(x => x.UserName).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<UserDTO>>(users);
		}

		[HttpPost("makeAdmin")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult> MakeAdmin([FromBody] string userId)
		{
			var user = await userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return BadRequest("Utilizatorul nu a fost găsit.");
			}

			var isAdmin = (await userManager.GetClaimsAsync(user)).Any(c => c.Type == "role" && c.Value == "admin");
			if (isAdmin)
			{
				return BadRequest("Utilizatorul este deja admin.");
			}

			await userManager.AddClaimAsync(user, new Claim("role", "admin"));
			return NoContent();
		}


		[HttpPost("removeAdmin")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult> RemoveAdmin([FromBody] string userId)
		{
			var user = await userManager.FindByIdAsync(userId);
			await userManager.RemoveClaimAsync(user, new Claim("role", "admin"));
			return NoContent();
		}

		[HttpPost("edit")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public async Task<IActionResult> UpdateUserFields([FromBody] UserEditDTO userEditDTO)
		{
			// Verifica identitatea utilizatorului
			var user = await userManager.FindByNameAsync(userEditDTO.UserName);
			if (user == null)
			{
				return NotFound(); //  cazul în care utilizatorul nu a fost găsit
			}
			user.PhoneNumber = userEditDTO.PhoneNumber;
			user.Email = userEditDTO.Email;

			await userManager.UpdateAsync(user);
			return NoContent(); 
		}



		[HttpPost("login")]
		public async Task<ActionResult<AuthenticationResponse>> Login(
			[FromBody] LoginCredentials userCredentials)
		{

			var result = await signInManager.PasswordSignInAsync(userCredentials.Username,
				userCredentials.Password, isPersistent: false, lockoutOnFailure: false);


			if (result.Succeeded)
			{
				var user = await userManager.FindByNameAsync(userCredentials.Username);
				return await BuildToken(user);
			}
			else
			{
				return BadRequest("Autentificare nereușită");
			}
		}

		//get info about a user by Username
		[HttpGet("{username}")]
		public async Task<ActionResult<UserDTO>> GetUserInfo(string username)
		{
			var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == username);

			if (user == null) { 
				return NotFound(); }

			return mapper.Map<UserDTO>(user);

		}


		[HttpGet("info/{userId}")]
		public async Task<ActionResult<UserDTO>> GetUserInfoById(string userId)
		{
			var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId);

			if (user == null)
			{
				return NotFound();
			}

			return mapper.Map<UserDTO>(user);

		}

		//Delete user by Id
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await userManager.FindByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			var result = await userManager.DeleteAsync(user);
			if (result.Succeeded)
			{
				return NoContent();
			}
			else
			{
				return BadRequest(result.Errors);
			}
		}

		private async Task<AuthenticationResponse> BuildToken(IdentityUser userCredentials)
		{
			var user = await userManager.FindByEmailAsync(userCredentials.Email);
			if (user == null)
			{
				return null;
			}

			var claims = new List<Claim>()
			{
				new Claim("userName", user.UserName)
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

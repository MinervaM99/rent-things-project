using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RentThingsAPI.DTOs;
using RentThingsAPI.Entities;
using RentThingsAPI.Helpers;

namespace RentThingsAPI.Controllers
{

	[ApiController]
	[Route("api/items")]
	public class ItemsController : ControllerBase
	{

		private readonly ApplicationDbContext context;
		private readonly UserManager<IdentityUser> userManager;

		private readonly IMapper mapper;

		public ItemsController(ApplicationDbContext context, UserManager<IdentityUser> userManager, IMapper mapper)
		{
			this.context = context;
			this.userManager = userManager;
			this.mapper = mapper;

		}

		[HttpPost]
		//	[Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
		public async Task<ActionResult> CreateItem([FromBody] ItemCreationDTO itemCreationDTO)
		{

			//var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
			//var user = await userManager.FindByEmailAsync(email);
			var newItem = new Item
			{
				Name = itemCreationDTO.Title,
				Description = itemCreationDTO.Description,
				Condition = itemCreationDTO.Condition,
				Photo = itemCreationDTO.Photo,
				Location = itemCreationDTO.Location,
				DayPrice = itemCreationDTO.DayPrice,
				MonthPrice = itemCreationDTO.MonthPrice,
				WeekPrice = itemCreationDTO.WeekPrice,
				Available = itemCreationDTO.Available
			};

			// Găsiți categoria cu CategoryId specificat
			var category = await context.Categories.FindAsync(itemCreationDTO.CategoryId);
			if (category == null)
			{
				return BadRequest("Category not found.");
			}

			// Găsiți utilizatorul cu UserId specificat
			var user = await userManager.FindByIdAsync(itemCreationDTO.UserId);
			if (user == null)
			{
				return BadRequest("User not found.");
			}

			newItem.Category = category;
			newItem.User = user;

			context.Items.Add(newItem);
			await context.SaveChangesAsync();

			return Ok(itemCreationDTO);
		}


		[HttpGet]
		public async Task<ActionResult<List<ItemDTO>>> GetItems()
		{
			var items = await context.Items.ToListAsync();
			var itemDTOs = mapper.Map<List<ItemDTO>>(items);
			return itemDTOs;
		}

		[HttpGet("/items")]
		public async Task<ActionResult<List<ItemDTO>>> GetItemsByUser(string userEmail)
		{
			var user = await userManager.FindByEmailAsync(userEmail);
			if (user == null)
			{
				return NotFound("User not found");
			}

			var items = await context.Items.Where(i => i.UserId == user.Id).ToListAsync();
			var itemDTOs = mapper.Map<List<ItemDTO>>(items);
			return itemDTOs;
		}
	}
}

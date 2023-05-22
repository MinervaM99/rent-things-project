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
		private readonly IFileStorageService fileStorageService;
		private readonly string containerName = "items";

		public ItemsController(ApplicationDbContext context, UserManager<IdentityUser> userManager, IMapper mapper, IFileStorageService fileStorageService)
		{
			this.context = context;
			this.userManager = userManager;
			this.mapper = mapper;
			this.fileStorageService = fileStorageService;
		}

		[HttpPost]
		//	[Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
		public async Task<ActionResult> CreateItem([FromForm] ItemCreationDTO itemCreationDTO)
		{

			//var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
			//var user = await userManager.FindByEmailAsync(email);

			var newItem = mapper.Map<Item>(itemCreationDTO);

			// Găsește utilizatorul cu UserId specificat
			var user = await userManager.FindByIdAsync(itemCreationDTO.UserId);
			if (user == null)
			{
				return BadRequest("Utilizatorul nu a fost găsit.");
			}

			newItem.User = user;

			if (itemCreationDTO.Photo != null)
			{
				newItem.Photo = await fileStorageService.SaveFile(containerName, itemCreationDTO.Photo);
			}

			context.Items.Add(newItem);
			await context.SaveChangesAsync();

			return Ok(itemCreationDTO);

		}


		//Get all items
		[HttpGet]
		public async Task<ActionResult<LandingPage>> GetItems()
		{
			var top = 3;

			var items = await context.Items.Include(x => x.Category).Take(top).ToListAsync();
			if (items == null)
			{
				return NotFound();
			}
			var landingPageDTO = new LandingPage();
			landingPageDTO.LastItemsAdded = mapper.Map<List<ItemDTO>>(items);

			return landingPageDTO;
		}


		//Get all items for a certain user
		[HttpGet("userItems")]
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


		//get items by category
		[HttpGet("category/{category:int}")]
		public async Task<ActionResult<List<ItemDTO>>> GetItemsByCategory(int category)
		{
			var items = await context.Items.Include(x => x.Category).Where(x => x.CategoryId == category).ToListAsync();
			if (items == null)
			{
				return NotFound("User not found");
			}

			var itemDTOs = mapper.Map<List<ItemDTO>>(items);
			return itemDTOs;
		}


		//get an item by Id
		[HttpGet("{id:int}")]
		public async Task<ActionResult<ItemDTO>> GetItemById(int id)
		{
			var item = await context.Items.Include(x => x.Category).SingleOrDefaultAsync(x => x.Id == id);

			if (item == null)
			{
				return NotFound();
			}

			var dto = mapper.Map<ItemDTO>(item);
			return dto;
		}


		[HttpPut("{id:int}")]
		public async Task<ActionResult> EditItem(int Id, [FromForm] ItemCreationDTO itemCreationDTO)
		{

			var item = await context.Items.Include(x => x.Category).FirstOrDefaultAsync(x=> x.Id == Id);
			if (item == null) { return NotFound(); };

			item = mapper.Map(itemCreationDTO, item);

			if (itemCreationDTO.Photo != null)
			{
				item.Photo = await fileStorageService.EditFile(containerName, itemCreationDTO.Photo, item.Photo);
			}

			await context.SaveChangesAsync();
			return Ok(item);
		}


		[HttpDelete("{id:int}")]
		public async Task<ActionResult> DeleteItem(int Id, [FromForm] ItemCreationDTO itemCreationDTO)
		{

			var item = await context.Items.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == Id);
			if (item == null) { return NotFound(); };

			context.Remove(item);
			await context.SaveChangesAsync();
			return Ok(item);
		}
	}
}

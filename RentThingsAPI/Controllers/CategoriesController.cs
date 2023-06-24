using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using RentThingsAPI.DTOs;
using RentThingsAPI.Entities;
using RentThingsAPI.Helpers;

namespace RentThingsAPI.Controllers
{
	[Route("api/categories")]
	[ApiController] //don't need explicit validation
	public class CategoriesController: ControllerBase
	{
		private readonly ILogger<CategoriesController> logger;
		private readonly ApplicationDbContext context;
		private readonly IMapper mapper;

		public CategoriesController(ILogger<CategoriesController> logger, ApplicationDbContext context, IMapper mapper)
		{
			this.logger = logger;
			this.context = context;
			this.mapper = mapper;
		}

		//get all categories
		[HttpGet]
		public async Task<ActionResult<List<CategoryDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
		{
			logger.LogInformation("Getting all the categories");
			var queryable = context.Categories.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var categories =  await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<CategoryDTO>>(categories);
		}



		//get one category by Id
		[HttpGet("{Id:int}")] //api/categories/example
		public async Task<ActionResult<CategoryDTO>> GetId(int Id)
		{
			var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == Id);

			if(category == null) { return NotFound(); }
			
			return mapper.Map<CategoryDTO>(category);

		}


		//add category
		[HttpPost]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult> Post([FromBody] CategoryCreationDTO categoryCreationDTO)
		{
			var genere = mapper.Map<Category>(categoryCreationDTO);
			context.Add(genere);
			await context.SaveChangesAsync();
			return NoContent();
		}

		//edit category
		[HttpPut("{id:int}")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult> Put(int id, [FromBody] CategoryCreationDTO categoryCreationDTO)
		{
			var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);

			if(category == null) { return NotFound();}
			category = mapper.Map(categoryCreationDTO, category);

			await context.SaveChangesAsync();
			return NoContent();
		}

		//delete category
		[HttpDelete("{id:int}")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
		public async Task<ActionResult> Delete(int id)
		{
			var exists = await context.Categories.AnyAsync(x => x.Id == id); 

			if (!exists) { return NotFound(); }

			context.Remove(new Category() { Id = id });
			await context.SaveChangesAsync();
			return NoContent();

		}
	}
}

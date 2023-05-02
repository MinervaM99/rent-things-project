using AutoMapper;
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

		[HttpGet]
		public async Task<ActionResult<List<CategoryDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
		{
			logger.LogInformation("Getting all the categories");
			var queryable = context.Categories.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var categories =  await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<CategoryDTO>>(categories);
		}




		[HttpGet("{Id:int}")] //api/categories/example
		public ActionResult<Category> GetId(int Id)
		{
			throw new NotImplementedException();
		}




		[HttpPost] 
		public async Task<ActionResult>Post([FromBody] CategoryCreationDTO categoryCreationDTO)
		{
			var genere = mapper.Map<Category>(categoryCreationDTO);
			context.Add(genere);
			await context.SaveChangesAsync();
			return NoContent();
		}

		[HttpPut]
		public ActionResult Put([FromBody] Category category)
		{
			throw new NotImplementedException();
		}

		[HttpDelete]
		public ActionResult Delete()
		{
			throw new NotImplementedException();
		}
	}
}

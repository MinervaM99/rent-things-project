using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using RentThingsAPI.Entities;

namespace RentThingsAPI.Controllers
{
	[Route("api/categories")]
	[ApiController] //don't need explicit validation
	public class CategoriesController: ControllerBase
	{
		private readonly ILogger<CategoriesController> logger;

		public CategoriesController(ILogger<CategoriesController> logger)
		{
			this.logger = logger;
		}


		[HttpGet]
		public async Task<ActionResult<List<Category>>> Get()
		{
			logger.LogInformation("Getting all the categories");

			return new List<Category>() { new Category() { Id = 1, Name = "bucatarie" } };
		}

		[HttpGet("{Id:int}")] //api/categories/example
		public ActionResult<Category> GetId(int Id)
		{
			throw new NotImplementedException();
		}

		[HttpPost]
		public ActionResult Post([FromBody] Category category)
		{
			throw new NotImplementedException();
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

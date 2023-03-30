using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using RentThingsAPI.Entities;
using RentThingsAPI.Services;

namespace RentThingsAPI.Controllers
{
	[Route("api/categories")]
	[ApiController] //don't need explicit validation
	public class CategoriesController: ControllerBase
	{
		private readonly IRepository repository;

		public CategoriesController(IRepository repository)
		{
			this.repository = repository;
		}


		[HttpGet]
		public async Task<ActionResult<List<Category>>> Get()
		{
			return await repository.GetAllCategories();
		}

		[HttpGet("{Id:int}")] //api/categories/example
		public ActionResult<Category> GetId(int Id, [BindRequired] string name)
		{
			var category = repository.GetCategoryById(Id);

			if (category == null)
			{
				return NotFound();
			}

			return category;

		}


		[HttpPost]
		public ActionResult Post([FromBody] Category category)
		{
			return NoContent();
		}

		[HttpPut]
		public ActionResult Put([FromBody] Category category)
		{
			return NoContent();
		}

		[HttpDelete]
		public ActionResult Delete()
		{
			return NoContent();
		}
	}
}

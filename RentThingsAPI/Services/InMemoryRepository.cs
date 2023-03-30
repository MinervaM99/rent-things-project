using RentThingsAPI.Entities;

namespace RentThingsAPI.Services
{
	public class InMemoryRepository : IRepository
	{

		private List<Category> _categories;

		public InMemoryRepository()
		{
			_categories = new List<Category>()
			{
				new Category(){Id=1, Name="Bucatarie"},
				new Category(){Id=2, Name="Gradina"},
				new Category(){Id=3, Name="Haine"}
			};
		}

		public async Task<List<Category>> GetAllCategories()
		{
			await Task.Delay(1);
			return _categories;
		}

		public Category GetCategoryById(int Id)
		{
			return _categories.Find(x => Id == x.Id);
		}
	}
}

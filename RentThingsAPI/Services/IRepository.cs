using RentThingsAPI.Entities;

namespace RentThingsAPI.Services
{
	public interface IRepository
	{
		Task<List<Category>> GetAllCategories();
		Category GetCategoryById(int Id);
	}
}

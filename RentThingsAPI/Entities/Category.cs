using RentThingsAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.Entities
{
	public class Category
	{
		public int Id { get; set; }
		[Required(ErrorMessage ="This field is required")]
		[StringLength(10)]
		[FirstLetterUppercase]
		public string Name { get; set; }
	}
}

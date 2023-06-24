using Microsoft.AspNetCore.Identity;
using RentThingsAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class ItemCreationDTO
	{
		[Required(ErrorMessage = "This field is required")]
		[StringLength(40)]
		[FirstLetterUppercase]
		public string Name { get; set; }
		public string UserId { get; set; }
		public string Description { get; set; }
		[Required(ErrorMessage = "This field is required")]
		public int Condition { get; set; }
		public IFormFile? Photo { get; set; }
		[Required(ErrorMessage = "This field is required")]
		public int Age { get; set; }
		public string? Location { get; set; }
		public double? DayPrice { get; set; }
		public double? MonthPrice { get; set; }
		public double? WeekPrice { get; set; }
		public bool Available { get; set; }
		[Required(ErrorMessage = "This field is required")]
		public int CategoryId { get; set; }
	}
}

using Microsoft.AspNetCore.Identity;

namespace RentThingsAPI.Entities
{
	public class Item
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int Condition { get; set; }
		public string Photo { get; set; }
		public int Age { get; set; }
		public string? Location { get; set; }
		public decimal DayPrice { get; set; }
		public decimal? MonthPrice { get; set; }
		public decimal? WeekPrice { get; set; }
		public bool Available { get; set; }

		public string UserId { get; set; }
		public IdentityUser User { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

	}
}

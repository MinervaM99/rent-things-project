using Microsoft.AspNetCore.Identity;
using RentThingsAPI.Entities;

namespace RentThingsAPI.DTOs
{
	public class ItemDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int Condition { get; set; }
		public string Photo { get; set; }
		public int Age { get; set; }
		public string? Location { get; set; }
		public double DayPrice { get; set; }
		public double? MonthPrice { get; set; }
		public double? WeekPrice { get; set; }
		public bool Available { get; set; }
		public UserInfoDTO UserId { get; set; }
		public CategoryDTO CategoryId { get; set; }
	}
}

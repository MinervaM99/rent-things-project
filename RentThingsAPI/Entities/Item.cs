namespace RentThingsAPI.Entities
{
	public class Item
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Condition { get; set; }
		public string Photo { get; set; }
		public int Age { get; set; }
		public string? Location { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

		public int NormalUserId { get; set; }
	//	public NormalUser NormalUser { get; set; }

		public decimal DayPrice { get; set; }
		public decimal MonthPrice { get; set; }
		public decimal WeekPrice { get; set; }

	}
}

namespace RentThingsAPI.DTOs
{
	public class TransactionCreationDTO
	{
		public int ItemId { get; set; }
		public string UserId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public decimal Earnings { get; set; }
		public int? Status { get; set; }
	}
}

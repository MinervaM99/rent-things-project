using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class TransactionCreationDTO
	{
		[Required]	
		public int ItemId { get; set; }
		[Required]
		public string UserId { get; set; }
		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		[Required]
		public decimal Earnings { get; set; }
		[Required]
		public int Status { get; set; }
	}
}

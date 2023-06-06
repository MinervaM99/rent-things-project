using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentThingsAPI.Entities
{
	public class Transaction
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }
		[Required]
		public int ItemId { get; set; }
		public Item Item { get; set; }
		[Required]
		public string UserId { get; set; }
		public IdentityUser User { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public decimal Earnings { get; set; }
		public int Status { get; set; }	
	}
}

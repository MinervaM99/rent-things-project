using Microsoft.AspNetCore.Identity;
using RentThingsAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class TransactionDTO
	{
		public string Id { get; set; }
		public ItemDTO ItemId { get; set; }
		public UserInfoDTO UserId { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public decimal? Earnings { get; set; }
		public int? Status { get; set; }
	}
}

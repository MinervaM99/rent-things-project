using Microsoft.AspNetCore.Identity;
using RentThingsAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class TransactionDTO
	{
		public int ItemId { get; set; }
		public string UserId { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public int? Status { get; set; }
	}
}

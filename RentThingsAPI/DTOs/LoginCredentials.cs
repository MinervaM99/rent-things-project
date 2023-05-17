using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class LoginCredentials
	{

		[Required]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
	}
}

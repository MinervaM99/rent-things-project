using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	public class LoginCredentials
	{

		[Required]
		public string Username { get; set; }
		[Required]
		public string Password { get; set; }
	}
}

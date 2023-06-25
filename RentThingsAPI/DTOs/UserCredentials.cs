using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	//Necessary informations for the user tu authenticate
	public class UserCredentials
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		[Phone]
		public string PhoneNumber { get; set; }
		[Required]
		public string UserName { get; set; }


	}
}

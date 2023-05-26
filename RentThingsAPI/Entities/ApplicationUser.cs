using Microsoft.AspNetCore.Identity;
using RentThingsAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.Entities
{
	public class ApplicationUser : IdentityUser
	{
		[StringLength(40)]
		[FirstLetterUppercase]
		public string FirstName { get; set; }
		[StringLength(40)]
		[FirstLetterUppercase]
		public string LastName { get; set; }
	}
}

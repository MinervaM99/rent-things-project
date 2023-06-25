using Microsoft.AspNetCore.Identity;

namespace RentThingsAPI.Entities
{
	public class AplicationUser : IdentityUser
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Description { get; set; }
		public string Links { get; set; }
	}
}

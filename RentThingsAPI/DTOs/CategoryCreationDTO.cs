using RentThingsAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace RentThingsAPI.DTOs
{
	//avem nevoie de asta pt ca atunci cand facem un post, sa nu permitem ca sa insereze frontend ul id-ul
	public class CategoryCreationDTO
	{
		[Required(ErrorMessage = "This field is required")]
		[StringLength(40)]
		[FirstLetterUppercase]
		public string Name { get; set; }
	}
}

using AutoMapper;
using Microsoft.AspNetCore.Identity;
using RentThingsAPI.DTOs;
using RentThingsAPI.Entities;

namespace RentThingsAPI.Helpers
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles() {
			// Add your AutoMapper configuration here
			CreateMap<Transaction, TransactionDTO>().ReverseMap();
			CreateMap<TransactionDTO, Transaction>().ReverseMap();
			CreateMap<Category, CategoryDTO>().ReverseMap();
			CreateMap<CategoryCreationDTO, Category>();
			CreateMap<Item, ItemDTO>()
				.ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category)).ReverseMap();

			CreateMap<ItemCreationDTO, Item>().ForMember(x => x.Photo, option => option.Ignore());

			CreateMap<IdentityUser, UserDTO>().ReverseMap();
			CreateMap<IdentityUser, UserInfoDTO>().ReverseMap();
		}

	}
}

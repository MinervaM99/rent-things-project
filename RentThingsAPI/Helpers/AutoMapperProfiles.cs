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
			CreateMap<Transaction, TransactionDTO>()
				.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User))
				.ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.Item))
				.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToLocalTime()))
				.ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate.ToLocalTime()))
				.ReverseMap();

			CreateMap<TransactionCreationDTO, Transaction>()
				.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToUniversalTime()))
				.ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate.ToUniversalTime()))
				.ReverseMap();

			CreateMap<Category, CategoryDTO>().ReverseMap();
			CreateMap<CategoryCreationDTO, Category>();

			CreateMap<Item, ItemDTO>()
				.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User))
				.ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category)).ReverseMap();

			CreateMap<ItemCreationDTO, Item>().ForMember(x => x.Photo, option => option.Ignore());

			CreateMap<IdentityUser, UserDTO>().ReverseMap();
			CreateMap<IdentityUser, UserInfoDTO>().ReverseMap();
		}

	}
}

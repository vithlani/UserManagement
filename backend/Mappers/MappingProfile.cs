using AutoMapper;
using UserManagementSystem.DTOs;
using UserManagementSystem.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserProfileDto>();
        CreateMap<UpdateUserProfileDto, User>().ReverseMap();
        CreateMap<RegisterUserDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Ignore PasswordHash for now
            .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore()); // Ignore PasswordSalt for now
    }
}
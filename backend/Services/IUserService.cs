using UserManagementSystem.DTOs;
using UserManagementSystem.Models;

namespace UserManagementSystem.Services
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(RegisterUserDto dto);
        Task<string> AuthenticateUserAsync(string username, string password);
        Task<UserProfileDto> GetUserProfileAsync(int userId);
        Task<UserProfileDto> UpdateUserProfileAsync(int userId, UpdateUserProfileDto dto);
    }
}

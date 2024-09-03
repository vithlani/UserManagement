using UserManagementSystem.DTOs;

namespace UserManagementSystem.Services
{
    public interface IUserService
    {
        Task RegisterUserAsync(RegisterUserDto dto);
        Task<string> AuthenticateUserAsync(string username, string password);
        Task<UserProfileDto> GetUserProfileAsync(int userId);
        Task UpdateUserProfileAsync(int userId, UpdateUserProfileDto dto);
    }
}

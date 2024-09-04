using UserManagementSystem.DTOs;
using UserManagementSystem.Models;

namespace UserManagementSystem.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByIdAsync(int userId);
        Task<User> AddUserAsync(User user);
        Task<bool> UserExistsAsync(string username);
        Task<User> UpdateUserAsync(User user);
    }
}

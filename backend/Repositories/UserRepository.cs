using Microsoft.EntityFrameworkCore;
using UserManagementSystem.Data;
using UserManagementSystem.Helpers.Exceptions;
using UserManagementSystem.Models;

namespace UserManagementSystem.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManagementDbContext _context;

        public UserRepository(UserManagementDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user == null) throw new UserNotFoundException("User not found.");
            return user;
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new UserNotFoundException("User not found.");
            return user;
        }

        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync(); // Ensure changes are saved
            return user; // Return the user with generated properties
        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync(); // Ensure changes are saved
            return user; // Return updated user
        }
    }
}
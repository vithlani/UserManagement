using System.Security.Cryptography;
using System.Text;
using UserManagementSystem.DTOs;
using UserManagementSystem.Models;
using UserManagementSystem.Repositories;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UserManagementSystem.Helpers.Exceptions;

namespace UserManagementSystem.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<User> RegisterUserAsync(RegisterUserDto dto)
        {
            if (await _userRepository.UserExistsAsync(dto.Username))
                throw new UsernameAlreadyExistsException("Username already exists.");

            var user = _mapper.Map<User>(dto);
            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
            user.PasswordSalt = hmac.Key;

            return await _userRepository.AddUserAsync(user);
        }

        public async Task<string> AuthenticateUserAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null) throw new UserNotFoundException("User not found.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            if (!computedHash.SequenceEqual(user.PasswordHash))
                throw new Exception("Incorrect password.");

            return GenerateToken(user);
        }

        public async Task<UserProfileDto> GetUserProfileAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null) throw new UserNotFoundException("User not found.");

            return _mapper.Map<UserProfileDto>(user);
        }

        public async Task<UserProfileDto> UpdateUserProfileAsync(int userId, UpdateUserProfileDto dto)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null) throw new UserNotFoundException("User not found.");

            _mapper.Map(dto, user);
            user.UpdatedDate = DateTime.UtcNow;

            await _userRepository.UpdateUserAsync(user);
            var updatedUserDto = _mapper.Map<UserProfileDto>(user);

            return updatedUserDto;
        }

        private string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
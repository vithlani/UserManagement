using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UserManagementSystem.DTOs;
using UserManagementSystem.Services;

namespace UserManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
            {
                var profile = await _userService.GetUserProfileAsync(userId);
                return Ok(profile);
            }
            else
            {
                // Handle the case when the user ID is not a valid integer
                return BadRequest("Invalid user ID format.");
            }

        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(UpdateUserProfileDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
            {
                var updatedProfile = await _userService.UpdateUserProfileAsync(userId, dto);
                return Ok(updatedProfile);
            }
            else
            {
                // Handle the case when the user ID is not a valid integer
                return BadRequest("Invalid user ID format.");
            }
        }
    } 
}

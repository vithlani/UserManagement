using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.DTOs
{
    public class RegisterUserDto
    {
        [Required (ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required (ErrorMessage = "Username is required")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Email Address is not valid.")]
        public string Email { get; set; }

        [Required (ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

}

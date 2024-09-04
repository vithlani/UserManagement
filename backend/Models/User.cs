using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Models
{
    public class User
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "UserName cannot be longer than 50 characters.")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress (ErrorMessage = "Email Address is not valid.")]
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}

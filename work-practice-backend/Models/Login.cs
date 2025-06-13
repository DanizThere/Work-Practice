using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class Login
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }

        public bool IsUserExists(string email, string password)
        {
            return email == Email && password == Password;
        }
    }
}

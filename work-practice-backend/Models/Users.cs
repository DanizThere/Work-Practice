using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class Users
    {
        [Key]
        public required string email { get; set; }
        public required string password { get; set; }
        public required string name { get; set; }
        public required string nickname { get; set; }
        public required string role { get; set; }
        public string? lastname { get; set; }
    }
}

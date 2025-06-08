using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class Companies
    {
        [Key]
        public required string name { get; set; }
        public required string corporateemail { get; set; }
        public required DateOnly dateofregistration { get; set; }
        public string? description { get; set; }
        public string? image { get; set; }
        public string? author { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class CompanyDecks
    {
        [Key]
        public required string id { get; set; }
        public required string userdecks { get; set; }
        public required string companyemail { get; set; }
    }
}

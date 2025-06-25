using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class CompanyStates
    {
        [Key]
        public required int idstate { get; set; }
        public required string name { get; set; }
        public required string username { get; set; }
    }
}

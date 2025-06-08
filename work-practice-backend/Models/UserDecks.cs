using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class UserDecks
    {
        [Key]
        public required string id { get; set; }
        public required string useremail { get; set; }
        public required string companyemail { get; set; }
        public required string taskid { get; set; }
    }
}

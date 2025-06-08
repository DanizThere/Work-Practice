using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class Tasks
    {
        [Key]
        public required string id { get; set; }
        public required string taskauthor { get; set; }
        public required string taskuser { get; set; }
        public required DateOnly creationtime { get; set; }
        public required string name { get; set; }
        public required string companyemail { get; set; }
        public string? description { get; set; }
        public string? tag { get; set; }
        public DateOnly? timetodeadline { get; set; }
    }
}

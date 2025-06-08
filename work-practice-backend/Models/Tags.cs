using System.ComponentModel.DataAnnotations;

namespace work_practice_backend.Models
{
    public class Tags
    {
        [Key]
        public required string nametag { get; set; }
        public required string name {  get; set; }

    }
}

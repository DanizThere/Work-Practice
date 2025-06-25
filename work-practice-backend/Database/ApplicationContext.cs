using Microsoft.EntityFrameworkCore;
using work_practice_backend.Models;

namespace work_practice_backend.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Companies> companies { get; set; }
        public DbSet<CompanyDecks> companydecks { get; set; }
        public DbSet<CompanyStates> companystates { get; set; }
        public DbSet<Tags> tags { get; set; }
        public DbSet<Tasks> tasks { get; set; }
        public DbSet<UserDecks> userdecks { get; set; }
        public DbSet<Users> users { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}

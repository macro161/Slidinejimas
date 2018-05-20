using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Visitors.Models
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }
        public DbSet<Trasa> Trasos { get; set; }

        public DbSet<Paslauga> Paslaugos { get; set; }

        public DbSet<PaslauguKrepselis> PaslauguKrepseliai { get; set; }

        public DbSet<Statistika> Statistika { get; set; }

        public DbSet<Zinute> Zinutes { get; set; }

    }
}
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;

namespace LucyCover_Database
{
    public class DbConnection:DbContext
    {
        public DbConnection(DbContextOptions<DbConnection> options) : base(options) { }

        public DbSet<Patient> Patients{ get; set; }
        public DbSet<Children> Children { get;set;}
        
    }
}
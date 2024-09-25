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
        public DbSet<Documentation> Documentation { get; set; }
        public DbSet<DocumentationFirstVisit> DocumentationFirstVisit{ get; set; }
        public DbSet<DocumentationNextVisit> DocumentationNextVisit{ get; set; }
        public DbSet<Recommendation> Recommendations { get; set;}
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<EducationMaterials> EducationMaterials { get; set;}
        public DbSet<EducationMaterialsAssignedPatients> EducationMaterialsAssignedPatients{ get; set; }
    }
}
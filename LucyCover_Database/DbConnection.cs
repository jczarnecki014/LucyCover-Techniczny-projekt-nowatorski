using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Options;
using SoftFluent.EntityFrameworkCore.DataEncryption;
using SoftFluent.EntityFrameworkCore.DataEncryption.Providers;

namespace LucyCover_Database
{
    public class DbConnection:DbContext
    {
        private readonly byte[] _encryptionKey;
	    private readonly byte[] _encryptionIV;
	    private readonly IEncryptionProvider _provider;

        public DbConnection(DbContextOptions<DbConnection> options,IOptions<EncryptionSettings> encryptionOptions) : base(options) 
        {
            _encryptionKey = Convert.FromBase64String(encryptionOptions.Value.Key);
            _encryptionIV = Convert.FromBase64String(encryptionOptions.Value.IV);
            _provider = new AesProvider(this._encryptionKey, this._encryptionIV);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
	    {
		    modelBuilder.UseEncryption(_provider);
	    }

        public DbSet<Patient> Patients{ get; set; }
        public DbSet<Children> Children { get;set;}
        public DbSet<Documentation> Documentation { get; set; }
        public DbSet<DocumentationFirstVisit> DocumentationFirstVisit{ get; set; }
        public DbSet<DocumentationNextVisit> DocumentationNextVisit{ get; set; }
        public DbSet<Recommendation> Recommendations { get; set;}
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<EducationMaterials> EducationMaterials { get; set;}
        public DbSet<EducationMaterialsAssignedPatients> EducationMaterialsAssignedPatients{ get; set; }
        public DbSet<User> User { get; set; }

    }
}
using LucyCover_Database.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbConnection _db;
        public UnitOfWork(DbConnection db) 
        {
            _db= db;
            patient = new PatientRepository(db);
            documentation= new DocumentationRepository(db);
        }

        public IPatientRepository patient { get; private set; }

        public IDocumentationRepository documentation {get; private set; }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}

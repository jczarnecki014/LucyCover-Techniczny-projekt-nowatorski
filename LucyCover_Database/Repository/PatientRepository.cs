using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class PatientRepository : Repository<Patient>, IPatientRepository
    {
        private readonly DbConnection _db;
        public PatientRepository(DbConnection db):base(db) 
        {
            _db = db;
        }
        public void Update(Patient patient)
        {
           _db.Patients.Update(patient);
        }
    }
}

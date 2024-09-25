using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class EducationMaterialsAssignedPatientsRepository : Repository<EducationMaterialsAssignedPatients>, IEducationMaterialsAssignedPatientsRepository
    {
        private readonly DbConnection _db;
        public EducationMaterialsAssignedPatientsRepository(DbConnection db):base(db) 
        {
            _db = db;
        }
        public void Update(EducationMaterialsAssignedPatients educationMaterialsAssignedPatients)
        {
           _db.EducationMaterialsAssignedPatients.Update(educationMaterialsAssignedPatients);
        }
    }
}

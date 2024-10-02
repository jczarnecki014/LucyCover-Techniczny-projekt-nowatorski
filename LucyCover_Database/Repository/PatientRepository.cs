using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
            Patient existPatient = _db.Patients.Include("children").FirstOrDefault(patientFromDb => patientFromDb.id == patient.id);

            if(existPatient != null) 
            {
                existPatient.birthDate = patient.birthDate;
                existPatient.birthPlace = patient.birthPlace;
                existPatient.phoneNumber = patient.phoneNumber;
                existPatient.address = patient.address;
                existPatient.email = patient.email;
                existPatient.children = patient.children;
                existPatient.city = patient.city;
                existPatient.firstName = patient.firstName;
                existPatient.lastName = patient.lastName;
                existPatient.province = patient.province;
                existPatient.zipCode = patient.zipCode;
                existPatient.id = patient.id;

                 _db.Entry(existPatient).State = EntityState.Modified;
            }
        }
    }
}

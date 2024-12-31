using AESEncryption;
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
        public UnitOfWork(DbConnection db,IEncryptionService es) 
        {
            _db= db;
            patient = new PatientRepository(db,es);
            documentation= new DocumentationRepository(db,es);
            documentationFirstVisit = new DocumentationFirstVisitRepository(db,es);
            documentationNextVisit = new DocumentationNextVisitRepository(db,es);
            recommendation = new RecommendationRepository(db,es);
            children = new ChildrenRepository(db,es);
            schedule = new ScheduleReposiotry(db,es);
            educationMaterials = new EducationMaterialsRepository(db,es);
            educationMaterialsAssignedPatients = new EducationMaterialsAssignedPatientsRepository(db,es);
            users= new UserRepository(db,es);
        }

        public IPatientRepository patient { get; private set; }

        public IDocumentationRepository documentation {get; private set; }

        public IDocumentationFirstVisitRepository documentationFirstVisit {get; private set; }

        public IDocumentationNextVisitRepository documentationNextVisit { get; private set; }

        public IRecommendationRepository recommendation { get; private set; }

        public IChildrenRepository children {get; private set;}

        public IScheduleRepository schedule {get; private set;}

        public IEducationMaterialsRepository educationMaterials { get; private set;}

        public IEducationMaterialsAssignedPatientsRepository educationMaterialsAssignedPatients { get; private set;}

        public IUserRepository users { get; private set;}

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}

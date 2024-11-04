using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository.IRepository
{
    public interface IUnitOfWork
    {
        void Save();
        public IPatientRepository patient { get; }
        public IChildrenRepository children { get; }
        public IDocumentationRepository documentation { get; }
        public IDocumentationFirstVisitRepository documentationFirstVisit { get; }
        public IDocumentationNextVisitRepository documentationNextVisit { get; }
        public IRecommendationRepository recommendation { get; }
        public IScheduleRepository schedule { get; }
        public IEducationMaterialsRepository educationMaterials{ get; }
        public IEducationMaterialsAssignedPatientsRepository educationMaterialsAssignedPatients { get; }
        public IUserRepository users { get; }
    }
}

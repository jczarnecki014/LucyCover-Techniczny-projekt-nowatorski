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
        public IDocumentationRepository documentation { get; }
        public IDocumentationFirstVisitRepository documentationFirstVisit { get; }
        public IDocumentationNextVisitRepository documentationNextVisit { get; }
        public IRecommendationRepository recommendation { get; }
    }
}

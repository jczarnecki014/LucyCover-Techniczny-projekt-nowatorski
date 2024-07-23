using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class DocumentationNextVisitRepository : Repository<DocumentationNextVisit>, IDocumentationNextVisitRepository
    {
        private readonly DbConnection _db;
        public DocumentationNextVisitRepository(DbConnection db):base(db) 
        {
            _db = db;
        }
        public void Update(DocumentationNextVisit documentation)
        {
           _db.DocumentationNextVisit.Update(documentation);
        }
    }
}

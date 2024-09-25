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
    public class ChildrenRepository : Repository<Children>, IChildrenRepository
    {
        private readonly DbConnection _db;
        public ChildrenRepository(DbConnection db):base(db) 
        {
            _db = db;
        }

        public void UpdateRange(List<Children> children) 
        {
            _db.Children.UpdateRange(children);
        }
        public void Update(Children children)
        {
           _db.Children.Update(children);
        }
    }
}

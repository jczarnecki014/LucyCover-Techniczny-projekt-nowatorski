using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository.IRepository
{
    public interface IScheduleRepository:IRepository<Schedule>
    {
        public IEnumerable<T> GetSpecificColumns<T>(Expression<Func<Schedule,bool>> condition, Expression<Func<Schedule,T>> selector, bool distinct = false );
        public void Update(Schedule schedule);
    }
}

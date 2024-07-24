using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        void Add (T entity);
        void AddRange (IEnumerable<T> entities);
        IEnumerable<T> GetAll (Expression<Func<T,bool>>?filter = null, string? includeProperties = null);
        T GetFirstOfDefault(Expression<Func<T,bool>>filter, string? includeProperties = null);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        bool Any(Expression<Func<T, bool>> filter);
    }
}

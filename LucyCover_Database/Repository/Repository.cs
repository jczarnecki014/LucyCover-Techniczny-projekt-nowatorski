using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{

    public class Repository<T>:IRepository<T> where T:class 
    {
        private readonly DbConnection _db;
        internal DbSet<T> dbSet;
        public Repository(DbConnection db) 
        {
            _db= db;
            dbSet = db.Set<T>();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            dbSet.AddRange(entities);
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null, bool distinct = false)
        {
            IQueryable<T> query;

            if(filter != null) 
            {
                query = dbSet.Where(filter);
            }
            else 
            {
                query = dbSet;
            }

            if(includeProperties != null)
            {
                foreach(var property in includeProperties.Split(',',StringSplitOptions.RemoveEmptyEntries)) 
                {
                    query = query.Include(property);
                }
            }

            if(distinct) 
            {
                query.Distinct();
            }

            return query.ToList();
        }

        public T GetFirstOfDefault(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query;
            query = dbSet.Where(filter);

            if(includeProperties != null)
            {
                foreach(var property in includeProperties.Split(',',StringSplitOptions.RemoveEmptyEntries)) 
                {
                    query = query.Include(property);
                }
            }

            return query.FirstOrDefault();
        }

        public void Remove(T entity)
        {
            dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
        }

        public bool Any(Expression<Func<T, bool>> filter)
        {
            return dbSet.Any(filter);
        }
    }
}

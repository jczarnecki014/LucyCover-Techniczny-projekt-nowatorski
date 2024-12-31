using AESEncryption;
using LucyCover_Database.Repository.IRepository;
using LucyCover_EncryptionSystem;
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
        private readonly IEncryptionService _encryptionService;
        internal DbSet<T> dbSet;
        public Repository(DbConnection db,IEncryptionService encryptionService) 
        {
            _db= db;
            dbSet = db.Set<T>();
            _encryptionService = encryptionService;
        }

        public void Add(T entity)
        {
            EncryptSensitiveData(entity);
            dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            foreach(var entity in entities) 
            {
                EncryptSensitiveData(entity);
            }
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

            var results = query.ToList();
            foreach (var entity in results)
            {
                DecryptSensitiveData(entity);
            }
            return results;
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

            var entity = query.FirstOrDefault();
            if (entity != null)
            {
                DecryptSensitiveData(entity); 
            }
            return entity;
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

        private void EncryptSensitiveData(T entity)
        {
            foreach (var property in entity.GetType().GetProperties())
            {
                if (property.PropertyType == typeof(string) && property.GetCustomAttributes(typeof(SensitiveDataAttribute ), false).Any())
                {
                    var plainText = property.GetValue(entity) as string;
                    if (!string.IsNullOrEmpty(plainText))
                    {
                        var cipherText = _encryptionService.Encrypt(plainText);
                        property.SetValue(entity, cipherText);
                    }
                }
            }
        }

        private void DecryptSensitiveData(T entity)
        {
            foreach (var property in entity.GetType().GetProperties())
            {
                if (property.PropertyType == typeof(string) && property.GetCustomAttributes(typeof(SensitiveDataAttribute ), false).Any())
                {
                    var cipherText = property.GetValue(entity) as string;
                    if (!string.IsNullOrEmpty(cipherText))
                    {
                        var plainText = _encryptionService.Decrypt(cipherText);
                        property.SetValue(entity, plainText);
                    }
                }
            }
        }
    }
}

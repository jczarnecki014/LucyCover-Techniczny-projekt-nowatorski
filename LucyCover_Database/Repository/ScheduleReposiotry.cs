using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class ScheduleReposiotry : Repository<Schedule>, IScheduleRepository
    {
        private readonly DbConnection _db;
        public ScheduleReposiotry(DbConnection db):base(db) 
        {
            _db = db;
        }

        public List<T> GetSpecificColumns<T>(Expression<Func<Schedule,bool>> condition, Expression<Func<Schedule,T>> selector, bool distinct = false ) 
        {
            IQueryable<T> result = _db.Schedules.Where(condition)
                                               .Select(selector)
                                               .Distinct();
            if(distinct)
            {
                result.Distinct();
            }

            return result.ToList();
        }

        public void Update(Schedule schedule)
        {
            
           Schedule existSchedule = _db.Schedules.FirstOrDefault(entity => entity.id == schedule.id);
           if (existSchedule != null) 
           {
               existSchedule.date = schedule.date;
               existSchedule.clock = schedule.clock;
               existSchedule.street = schedule.street;
               existSchedule.city = schedule.city;
               existSchedule.description = schedule.description;
               existSchedule.status = schedule.status;
               existSchedule.streetNumber = schedule.streetNumber;
               existSchedule.zipCode = schedule.zipCode;
               existSchedule.patientId = schedule.patientId;
               existSchedule.childId = schedule.childId;
               existSchedule.id = schedule.id;

               _db.Entry(existSchedule).State = EntityState.Modified;
           }
        }
    }
}

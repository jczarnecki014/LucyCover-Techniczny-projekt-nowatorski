﻿using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class RecommendationRepository : Repository<Recommendation>, IRecommendationRepository
    {
        private readonly DbConnection _db;
        public RecommendationRepository(DbConnection db):base(db) 
        {
            _db = db;
        }
        public void Update(Recommendation recommendation)
        {
           _db.Recommendations.Update(recommendation);
        }
    }
}

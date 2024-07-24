﻿using LucyCover_Database.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbConnection _db;
        public UnitOfWork(DbConnection db) 
        {
            _db= db;
            patient = new PatientRepository(db);
            documentation= new DocumentationRepository(db);
            documentationFirstVisit = new DocumentationFirstVisitRepository(db);
            documentationNextVisit = new DocumentationNextVisitRepository(db);
            recommendation = new RecommendationRepository(db);
            children = new ChildrenRepository(db);
        }

        public IPatientRepository patient { get; private set; }

        public IDocumentationRepository documentation {get; private set; }

        public IDocumentationFirstVisitRepository documentationFirstVisit {get; private set; }

        public IDocumentationNextVisitRepository documentationNextVisit { get; private set; }

        public IRecommendationRepository recommendation { get; private set; }

        public IChildrenRepository children {get; set;} 

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}

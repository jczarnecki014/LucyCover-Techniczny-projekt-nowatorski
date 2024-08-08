using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LucyCover_Database.Repository
{
    public class EducationMaterialsRepository : Repository<EducationMaterials>, IEducationMaterialsRepository
    {
        private readonly DbConnection _db;
        public EducationMaterialsRepository(DbConnection db):base(db) 
        {
            _db = db;
        }
        public void Update(EducationMaterials educationMaterials)
        {
           EducationMaterials material = _db.EducationMaterials.FirstOrDefault(entity => entity.Id == educationMaterials.Id);

           if(material is not null)
           {
                material.Id= educationMaterials.Id;
                material.date = educationMaterials.date;
                material.filePath = educationMaterials.filePath;
                material.fileName = educationMaterials.fileName;
                material.fileTitle = educationMaterials.fileTitle;

                _db.Entry(material).State = EntityState.Modified;
           }
        }
    }
}

﻿using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database.Repository.IRepository
{
    public interface IChildrenRepository:IRepository<Children>
    {
        public void UpdateRange(List<Children> children); 
        public void Update(Children children);
    }
}

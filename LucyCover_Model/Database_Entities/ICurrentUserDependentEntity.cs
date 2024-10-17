using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public interface ICurrentUserDependentEntity
    {
        public Patient patient{ get; set; }
    }
}

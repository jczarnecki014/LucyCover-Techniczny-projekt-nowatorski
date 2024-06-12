using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class Children_DTO
    {
        public string childFirstName { get;set;}
        public string childLastName { get;set;}
        public string childBirthDate { get;set;}
        public string childBirthPlace { get;set;}
        
    }
}

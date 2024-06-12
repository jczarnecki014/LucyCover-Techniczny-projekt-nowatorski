using LucyCover_Model.Database_Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class DocumentationList_DTO
    {
       public string patientName { get; set; }
       public List<Documentation> documentation { get; set;}
    }
}

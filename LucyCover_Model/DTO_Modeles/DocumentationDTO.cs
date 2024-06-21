using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class DocumentationDTO
    {
    [Required]
        public bool First { get; set; }
        public Patient Patient { get;set;}
        public Children Child { get; set; }
        public string Date { get; set; }
        public DocumentationFirstVisitDTO DocumentationFirstVisit { get; set; }
        public DocumentationNextVisitDTO DocumentationNextVisit { get; set; }
    }
}

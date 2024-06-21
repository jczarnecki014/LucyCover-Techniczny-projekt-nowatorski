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
        public Guid Id { get;set; }
        public bool First { get; set; }
        public Children Child { get; set; }
        public Guid PatientId { get;set; }
        public List<Children> ChildrenList { get; set; }
        public string Date { get; set; }
        public DocumentationFirstVisitDTO DocumentationFirstVisit { get; set; }
        public DocumentationNextVisitDTO DocumentationNextVisit { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class UpsertDocumentationDTO
    {
        public string Date { get;set;}
        public string ChildId { get;set;}
        public bool First { get;set;}
        public Guid DocumentationId { get; set; }
        public DocumentationFirstVisitDTO? DocumentationFirstVisit { get; set; }
        public DocumentationNextVisitDTO? DocumentationNextVisit { get; set; }
    }
}

using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class Documentation
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public bool First { get; set; }

        public Guid PatientId { get; set;}

        [Required]
        public Guid ChildId { get; set; }

        [ForeignKey(nameof(ChildId))]
        public Children Child { get; set; }

        [Required]
        public string Date { get; set; }

        public DocumentationFirstVisit DocumentationFirstVisit { get; set; }

        public DocumentationNextVisit DocumentationNextVisit { get;set; }
    }
}

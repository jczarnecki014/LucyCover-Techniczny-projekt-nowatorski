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
    public class Documentation: ICurrentUserDependentEntity
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        public bool first { get; set; }

        public Guid patientId { get; set;}

        [ForeignKey(nameof(patientId))]
        public Patient patient { get; set;}

        [Required]
        public Guid childId { get; set; }

        [ForeignKey(nameof(childId))]
        public Children child { get; set; }

        [Required]
        public string date { get; set; }

        public DocumentationFirstVisit documentationFirstVisit { get; set; }

        public DocumentationNextVisit documentationNextVisit { get;set; }
    }
}

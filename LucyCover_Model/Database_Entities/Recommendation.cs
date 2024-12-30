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
    public class Recommendation:ICurrentUserDependentEntity, IDbEntity
    {
        [Key]
        public Guid id { get;set; }

        [Required]
        [MaxLength(50)]
        public string date { get;set; }

        [Required]
        [MaxLength(50)]
        public string title { get;set; }

        [Required]
        public string text { get;set; }

        [Required]
        public Guid patientId { get;set; }

        [ForeignKey(nameof(patientId))]
        public Patient patient { get;set; }
    }
}

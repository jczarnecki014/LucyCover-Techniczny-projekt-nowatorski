using LucyCover_Model.Database_Model;
using SoftFluent.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class Schedule:ICurrentUserDependentEntity, IDbEntity
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        public string date { get; set; }

        [Required]
        [Encrypted]
        public string clock { get; set; }

        [Required]
        [Encrypted]
        public string status { get; set; }

        [Required]
        [Encrypted]
        public string city { get; set; }

        [Required]
        [Encrypted]
        public string street { get; set; }

        [Required]
        [Encrypted]
        public string streetNumber { get; set; }

        [Required]
        [Encrypted]
        public string zipCode { get; set; }

        [Required]
        [Encrypted]
        public string description { get; set; }

        public Guid patientId { get; set; }

        public Guid childId { get; set; }

        [ForeignKey("patientId")]
        public Patient patient { get; set; }

        [ForeignKey("childId")]
        public Children child { get; set; }
    }
}

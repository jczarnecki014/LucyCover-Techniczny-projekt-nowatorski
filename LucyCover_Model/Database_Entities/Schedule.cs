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
    public class Schedule:ICurrentUserDependentEntity, IDbEntity
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [MaxLength(15)]
        public string date { get; set; }

        [Required]
        [MaxLength(15)]
        public string clock { get; set; }

        [Required]
        [MaxLength(15)]
        public string status { get; set; }

        [Required]
        [MaxLength(25)]
        public string city { get; set; }

        [Required]
        [MaxLength(25)]
        public string street { get; set; }

        [Required]
        [MaxLength(5)]
        public string streetNumber { get; set; }

        [Required]
        [MaxLength(6)]
        public string zipCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string description { get; set; }

        public Guid patientId { get; set; }

        public Guid childId { get; set; }

        [ForeignKey("patientId")]
        public Patient patient { get; set; }

        [ForeignKey("childId")]
        public Children child { get; set; }
    }
}

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
    public class Children : IDbEntity
    {
        [Required]
        [Key]
        public Guid id { get; set; }

        [Required]
        [Encrypted]
        public string childFirstName { get;set;}
        [Required]
        [Encrypted]
        public string childLastName { get;set;}
        [Required]
        [Encrypted]
        public string childBirthDate { get;set;}
        [Required]
        [Encrypted]
        public string childBirthPlace { get;set;}
        
        public Guid patientId { get; set;}

        [ForeignKey("patientId")]
        public Patient patient { get;set;}

        public ICollection<Schedule> Schedules { get; set; }

    }
}

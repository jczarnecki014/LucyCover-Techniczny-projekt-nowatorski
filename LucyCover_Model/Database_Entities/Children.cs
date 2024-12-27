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
    public class Children : IDbEntity
    {
        [Required]
        [Key]
        public Guid id { get; set; }

        [Required]
        [MaxLength(50)]
        public string childFirstName { get;set;}
        [Required]
        [MaxLength(50)]
        public string childLastName { get;set;}
        [Required]
        [MaxLength(25)]
        public string childBirthDate { get;set;}
        [Required]
        [MaxLength(50)]
        public string childBirthPlace { get;set;}
        
        public Guid patientId { get; set;}

        [ForeignKey("patientId")]
        public Patient patient { get;set;}

        public ICollection<Schedule> Schedules { get; set; }

    }
}

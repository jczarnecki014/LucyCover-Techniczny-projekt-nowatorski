using LucyCover_Model.Database_Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class EducationMaterialsAssignedPatients
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid educationMaterialsId { get; set; }

        [Required]
        public Guid patientId { get; set; }

        [ForeignKey(nameof(educationMaterialsId))]
        public EducationMaterials educationMaterials { get; set; }

        [ForeignKey(nameof(patientId))]
        public Patient patient { get; set; }
    }
}

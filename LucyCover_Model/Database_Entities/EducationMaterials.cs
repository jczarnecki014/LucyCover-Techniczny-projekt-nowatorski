using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class EducationMaterials
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(100)]
        public string fileName { get; set; }

        [MaxLength(100)]
        public string fileTitle { get; set; }

        [MaxLength(300)]
        public string filePath { get;set;}

        [MaxLength(30)]
        public string date { get;set; }

        public Guid userId { get; set; }

        [ForeignKey(nameof(userId))]
        public User user { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class DocumentationFirstVisit
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string MotherFirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string MotherLastName { get; set; }

        [Required]
        [MaxLength(3)]
        public string MotherAge { get; set; }

        [Required]
        [MaxLength(100)]
        public string MotherProfesion { get; set; }

        [Required]
        [MaxLength(200)]
        public string MotherAddress { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyFirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyAge { get; set; }

        [Required]
        public string BabyBirthDay { get; set; }

        [Required]
        [MaxLength(100)]
        public string BabyBirthPlace { get; set; }

        [Required]
        [MaxLength(2)]
        public string BabyApgarScore { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyBirthTime { get; set; }

        [MaxLength(50)]
        public string BabyBirthTime_ADDITIONAL { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyBirthType { get; set; }

        [MaxLength(100)]
        public string BabyBirthTypeReason { get; set; }

        [Required]
        [MaxLength(100)]
        public string BabyBirthMedicine { get; set; }

        [MaxLength(1000)]
        public string DocumentationReason { get; set; }

        [Required]
        [MaxLength(3)]
        public string MotherBreastfeedBefore { get; set; }

        [MaxLength(50)]
        public string MotherBreastfeedBefore_HowLong { get; set; }

        [MaxLength(100)]
        public string MotherBreastfeedBefore_Why { get; set; }

        [Required]
        public Guid DocumentationId { get; set; }

        [ForeignKey(nameof(DocumentationId))]
        public Documentation Documentation { get;set; }
    }
}

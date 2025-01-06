using SoftFluent.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class DocumentationFirstVisit : IDbEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Encrypted]
        public string MotherFirstName { get; set; }

        [Required]
        [Encrypted]
        public string MotherLastName { get; set; }

        [Required]
        [Encrypted]
        public string MotherAge { get; set; }

        [Required]
        [Encrypted]
        public string MotherProfesion { get; set; }

        [Required]
        [Encrypted]
        public string MotherAddress { get; set; }

        [Required]
        [Encrypted]
        public string BabyFirstName { get; set; }

        [Required]
        [Encrypted]
        public string BabyAge { get; set; }

        [Required]
        [Encrypted]
        public string BabyBirthDay { get; set; }

        [Required]
        [Encrypted]
        public string BabyBirthPlace { get; set; }

        [Required]
        [Encrypted]
        public string BabyApgarScore { get; set; }

        [Required]
        [Encrypted]
        public string BabyBirthTime { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyBirthTime_ADDITIONAL { get; set; }

        [Required]
        [Encrypted]
        public string BabyBirthType { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyBirthTypeReason { get; set; }

        [Required]
        [Encrypted]
        public string BabyBirthMedicine { get; set; }

        [AllowNull]
        [Encrypted]
        public string? DocumentationReason { get; set; }

        [Required]
        [Encrypted]
        public string MotherBreastfeedBefore { get; set; }

        [AllowNull]
        [Encrypted]
        public string? MotherBreastfeedBefore_HowLong { get; set; }

        [AllowNull]
        [Encrypted]
        public string? MotherBreastfeedBefore_Why { get; set; }

        [Required]
        public Guid DocumentationId { get; set; }

        [ForeignKey(nameof(DocumentationId))]
        public Documentation Documentation { get;set; }
    }
}

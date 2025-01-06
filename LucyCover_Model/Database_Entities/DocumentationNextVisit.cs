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
    public class DocumentationNextVisit : IDbEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Encrypted]
        public string PatientFeedingCountPerDay { get; set; }

        [Required]
        [Encrypted]
        public string PatientFeedingBreastNumber { get; set; }

        [Required]
        [Encrypted]
        public string PatientFeedingHowMuchTime { get; set; }

        [Required]
        [Encrypted]
        public string PatientFeedingInNight { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastFeedingWithHood { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientBreastFeedingWithHood_HowLong { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastFeedingAsNeeded { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientBreastFeedingAsNeeded_How { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingCountPerDay_DAY1 { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingCountPerDay_DAY2 { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingCountPerDay_DAY3 { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingMIXCountPerDay_DAY1 { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingMIXCountPerDay_DAY2 { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientFeedingMIXCountPerDay_DAY3 { get; set; }

        [Required]
        [Encrypted]
        public string PatientFeedingWay { get; set; }

        [Required]
        [Encrypted]
        public string PatientExpressingBreastMilk { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientExpressingBreastMilkHowManyYesterday { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastGrowingDuringPregnacy { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientBreastGrowingDuringPregnacy_DAY { get; set; }

        [Required]
        [Encrypted]
        public string PatientMilkRush { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastSize { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastChanges { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientBreastChanges_WHAT { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastNipple { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastNippleAfterFeeding { get; set; }

        [Required]
        [Encrypted]
        public string PatientBreastNippleChanges { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientBreastNippleChanges_WHAT { get; set; }

        [Required]
        [Encrypted]
        public string PatientMentalState { get; set; }

        [AllowNull]
        [Encrypted]
        public string? ResearchObservationBabyBehaviour { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyPeeingADay { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyExcretionADay { get; set; }

        [Required]
        [Encrypted]
        public string BabyColic { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyColicSinceWhen { get; set; }

        [Required]
        [Encrypted]
        public string BabyNipple { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyNippleSinceWhen { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientMedicationsUsed { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyMedicationsUsed { get; set; }

        [Required]
        [Encrypted]
        public string PatientPeriodAfterDelivery { get; set; }

        [AllowNull]
        [Encrypted]
        public string? PatientPeriodAfterDelivery_WHEN { get; set; }

        [Required]
        [Encrypted]
        public string PostureCorection { get; set; }

        [Required]
        [Encrypted]
        public string SuckTraining { get; set; }

        [AllowNull]
        [Encrypted]
        public string? BabyFatten { get; set; }

        [AllowNull]
        [Encrypted]
        public string? OtherRecommendation { get; set; }

        [Required]
        public Guid DocumentationId { get; set; }

        [ForeignKey(nameof(DocumentationId))]
        public Documentation Documentation { get;set; }
    }
}

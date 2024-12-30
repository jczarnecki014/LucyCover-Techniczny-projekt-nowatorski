using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [MaxLength(50)]
        public string PatientFeedingCountPerDay { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientFeedingBreastNumber { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientFeedingHowMuchTime { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientFeedingInNight { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastFeedingWithHood { get; set; }

        [MaxLength(50)]
        public string PatientBreastFeedingWithHood_HowLong { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastFeedingAsNeeded { get; set; }

        [MaxLength(50)]
        public string PatientBreastFeedingAsNeeded_How { get; set; }

        [MaxLength(50)]
        public string PatientFeedingCountPerDay_DAY1 { get; set; }

        [MaxLength(50)]
        public string PatientFeedingCountPerDay_DAY2 { get; set; }

        [MaxLength(50)]
        public string PatientFeedingCountPerDay_DAY3 { get; set; }

        [MaxLength(50)]
        public string PatientFeedingMIXCountPerDay_DAY1 { get; set; }

        [MaxLength(50)]
        public string PatientFeedingMIXCountPerDay_DAY2 { get; set; }

        [MaxLength(50)]
        public string PatientFeedingMIXCountPerDay_DAY3 { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientFeedingWay { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientExpressingBreastMilk { get; set; }

        [MaxLength(50)]
        public string PatientExpressingBreastMilkHowManyYesterday { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastGrowingDuringPregnacy { get; set; }

        [MaxLength(50)]
        public string PatientBreastGrowingDuringPregnacy_DAY { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientMilkRush { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastSize { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastChanges { get; set; }

        [MaxLength(50)]
        public string PatientBreastChanges_WHAT { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastNipple { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastNippleAfterFeeding { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientBreastNippleChanges { get; set; }

        [MaxLength(50)]
        public string PatientBreastNippleChanges_WHAT { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientMentalState { get; set; }

        [MaxLength(250)]
        public string ResearchObservationBabyBehaviour { get; set; }


        [MaxLength(50)]
        public string BabyPeeingADay { get; set; }

        [MaxLength(50)]
        public string BabyExcretionADay { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyColic { get; set; }

        [MaxLength(50)]
        public string BabyColicSinceWhen { get; set; }

        [Required]
        [MaxLength(50)]
        public string BabyNipple { get; set; }

        [MaxLength(50)]
        public string BabyNippleSinceWhen { get; set; }

        [MaxLength(50)]
        public string PatientMedicationsUsed { get; set; }

        [MaxLength(50)]
        public string BabyMedicationsUsed { get; set; }

        [Required]
        [MaxLength(50)]
        public string PatientPeriodAfterDelivery { get; set; }

        [MaxLength(50)]
        public string PatientPeriodAfterDelivery_WHEN { get; set; }

        [Required]
        [MaxLength(50)]
        public string PostureCorection { get; set; }

        [Required]
        [MaxLength(50)]
        public string SuckTraining { get; set; }

        [MaxLength(50)]
        public string BabyFatten { get; set; }

        [MaxLength(250)]
        public string OtherRecommendation { get; set; }

        [Required]
        public Guid DocumentationId { get; set; }

        [ForeignKey(nameof(DocumentationId))]
        public Documentation Documentation { get;set; }
    }
}

using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class DocumentationNextVisitDTO
    {
        public string PatientFeedingCountPerDay { get; set; }

        public string PatientFeedingBreastNumber { get; set; }

        public string PatientFeedingHowMuchTime { get; set; }

        public string PatientFeedingInNight { get; set; }

        public string PatientBreastFeedingWithHood { get; set; }

        public string? PatientBreastFeedingWithHood_HowLong { get; set; }

        public string PatientBreastFeedingAsNeeded { get; set; }

        public string? PatientBreastFeedingAsNeeded_How { get; set; }

        public string PatientFeedingCountPerDay_DAY1 { get; set; }

        public string PatientFeedingCountPerDay_DAY2 { get; set; }

        public string PatientFeedingCountPerDay_DAY3 { get; set; }

        public string PatientFeedingMIXCountPerDay_DAY1 { get; set; }

        public string PatientFeedingMIXCountPerDay_DAY2 { get; set; }

        public string PatientFeedingMIXCountPerDay_DAY3 { get; set; }

        public string PatientFeedingWay { get; set; }

        public string PatientExpressingBreastMilk { get; set; }

        public string? PatientExpressingBreastMilkHowManyYesterday { get; set; }

        public string PatientBreastGrowingDuringPregnacy { get; set; }

        public string? PatientBreastGrowingDuringPregnacy_DAY { get; set; }

        public string PatientMilkRush { get; set; }

        public string PatientBreastSize { get; set; }

        public string PatientBreastChanges { get; set; }

        public string? PatientBreastChanges_WHAT { get; set; }

        public string PatientBreastNipple { get; set; }

        public string PatientBreastNippleAfterFeeding { get; set; }

        public string PatientBreastNippleChanges { get; set; }

        public string? PatientBreastNippleChanges_WHAT { get; set; }

        public string PatientMentalState { get; set; }

        public string ResearchObservationBabyBehaviour { get; set; }

        public string BabyPeeingADay { get; set; }

        public string BabyExcretionADay { get; set; }

        public string BabyColic { get; set; }

        public string? BabyColicSinceWhen { get; set; }

        public string BabyNipple { get; set; }

        public string? BabyNippleSinceWhen { get; set; }

        public string? PatientMedicationsUsed { get; set; }

        public string? BabyMedicationsUsed { get; set; }

        public string PatientPeriodAfterDelivery { get; set; }

        public string? PatientPeriodAfterDelivery_WHEN { get; set; }

        public string PostureCorection { get; set; }

        public string SuckTraining { get; set; }

        public string? BabyFatten { get; set; }

        public string? OtherRecommendation { get; set; }

    }
}

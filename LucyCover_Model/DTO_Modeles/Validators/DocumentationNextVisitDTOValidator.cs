using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class DocumentationNextVisitDTOValidator:AbstractValidator<DocumentationNextVisitDTO>
    {
        public DocumentationNextVisitDTOValidator() 
        {
            RuleFor(x => x.PatientFeedingCountPerDay).NotEmpty().NotNull().MaximumLength(20);
            RuleFor(x => x.PatientFeedingBreastNumber).NotEmpty().NotNull().MaximumLength(20);
            RuleFor(x => x.PatientFeedingHowMuchTime).NotEmpty().NotNull().MaximumLength(20);
            RuleFor(x => x.PatientFeedingCountPerDay_DAY1).NotEmpty().NotNull().MaximumLength(2);

            RuleFor(x => x.PatientFeedingCountPerDay_DAY2).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingCountPerDay_DAY3).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingMIXCountPerDay_DAY1).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingMIXCountPerDay_DAY2).NotEmpty().NotNull().MaximumLength(2);

            RuleFor(x => x.PatientFeedingMIXCountPerDay_DAY2).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingMIXCountPerDay_DAY2).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingMIXCountPerDay_DAY2).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.PatientFeedingWay).NotEmpty().NotNull().MaximumLength(50);

            RuleFor(x => x.PatientBreastNipple).NotEmpty().NotNull().MaximumLength(60);
            RuleFor(x => x.PatientBreastNippleAfterFeeding).NotEmpty().NotNull().MaximumLength(50);
            RuleFor(x => x.PatientMentalState).NotEmpty().NotNull().MaximumLength(50);
            RuleFor(x => x.ResearchObservationBabyBehaviour).NotEmpty().NotNull().MaximumLength(250);

            RuleFor(x => x.BabyPeeingADay).NotEmpty().NotNull().MaximumLength(50);
            RuleFor(x => x.BabyExcretionADay).NotEmpty().NotNull().MaximumLength(50);
        }
    }
}

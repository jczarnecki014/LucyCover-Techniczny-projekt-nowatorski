using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class UpsertPatientScheduleDTOValidator:AbstractValidator<UpsertPatientSheduleDTO>
    {
        public UpsertPatientScheduleDTOValidator() 
        { 
            RuleFor(x => x.clock).NotEmpty().MinimumLength(4).MaximumLength(8);
            RuleFor(x => x.date).NotEmpty().MinimumLength(10).MaximumLength(15);
            RuleFor(x => x.street).NotEmpty().MaximumLength(20);
            RuleFor(x => x.streetNumber).NotEmpty().MaximumLength(6);
            RuleFor(x => x.childId).NotEmpty();
            RuleFor(x => x.city).NotEmpty().MaximumLength(20);
            RuleFor(x => x.zipCode).NotEmpty().MaximumLength(6);
            RuleFor(x => x.description).NotEmpty().MaximumLength(250);
        }
    }
}

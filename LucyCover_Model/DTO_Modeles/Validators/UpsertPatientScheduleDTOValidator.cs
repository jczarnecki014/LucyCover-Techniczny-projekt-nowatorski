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
            RuleFor(x => x.clock).NotEmpty().WithMessage("clock cannot be empty");
            RuleFor(x => x.date).NotEmpty().WithMessage("date cannot be empty");
            RuleFor(x => x.street).NotEmpty().WithMessage("street cannot be empty");
            RuleFor(x => x.streetNumber).NotEmpty().WithMessage("streetNumber cannot be empty");
            RuleFor(x => x.childId).NotEmpty().WithMessage("childId cannot be empty");
            RuleFor(x => x.city).NotEmpty().WithMessage("city cannot be empty");
            RuleFor(x => x.zipCode).NotEmpty().MaximumLength(6).WithMessage("zipCode length has to be 6");
            RuleFor(x => x.description).NotEmpty().WithMessage("description cannot be empty");
        }
    }
}

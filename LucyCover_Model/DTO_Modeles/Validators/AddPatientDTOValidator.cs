using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class AddPatientDTOValidator: AbstractValidator<PatientDTO>
    {
        public AddPatientDTOValidator() 
        { 
            RuleFor(x => x.firstName).NotEmpty().MaximumLength(15);
            RuleFor(x => x.lastName).NotEmpty().MaximumLength(25);
            RuleFor(x => x.BirthPlace).NotEmpty().MaximumLength(25);
            RuleFor(x => x.city).NotEmpty().MaximumLength(25);
            RuleFor(x => x.address).NotEmpty().MaximumLength(25);
            RuleFor(x => x.province).NotEmpty().MaximumLength(25);
            RuleFor(x => x.zipCode).NotEmpty().MaximumLength(7).Matches(@"\d{2}-\d{3}$");
            RuleFor(x => x.phoneNumber).NotEmpty().MaximumLength(12).Matches(@"(\+48|48)?\s?\d{3}\s?\d{3}\s?\d{3}$");
            RuleFor(x => x.email).NotEmpty().MaximumLength(50).Matches(@"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            RuleFor(x => x.birthDate).NotEmpty().MaximumLength(25);
        }
    }
}

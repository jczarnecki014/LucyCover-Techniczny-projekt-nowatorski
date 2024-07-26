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
            RuleFor(x => x.firstName).NotEmpty().WithMessage("firstName cannot be empty");
            RuleFor(x => x.lastName).NotEmpty().WithMessage("lastName cannot be empty");
            RuleFor(x => x.BirthPlace).NotEmpty().WithMessage("birthPlace cannot be empty");
            RuleFor(x => x.city).NotEmpty().WithMessage("city cannot be empty");
            RuleFor(x => x.address).NotEmpty().WithMessage("address cannot be empty");
            RuleFor(x => x.province).NotEmpty().WithMessage("province cannot be empty");
            RuleFor(x => x.zipCode).NotEmpty().WithMessage("zipCode cannot be empty");
            RuleFor(x => x.phoneNumber).NotEmpty().WithMessage("phoneNumber cannot be empty");
            RuleFor(x => x.email).NotEmpty().WithMessage("email cannot be empty").EmailAddress();
            RuleFor(x => x.birthDate).NotEmpty().WithMessage("birthDate cannot be empty");
        }
    }
}

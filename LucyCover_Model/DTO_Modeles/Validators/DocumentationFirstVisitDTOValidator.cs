using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class DocumentationFirstVisitDTOValidator:AbstractValidator<DocumentationFirstVisitDTO>
    {
        public DocumentationFirstVisitDTOValidator() 
        {
            RuleFor(x => x.MotherFirstName).NotEmpty().NotNull();
            RuleFor(x => x.MotherLastName).NotEmpty().NotNull();
            RuleFor(x => x.MotherAge).NotEmpty().NotNull();
            RuleFor(x => x.MotherProfesion).NotEmpty().NotNull();
            RuleFor(x => x.MotherAddress).NotEmpty().NotNull();
            RuleFor(x => x.BabyFirstName).NotEmpty().NotNull();
            RuleFor(x => x.BabyAge).NotEmpty().NotNull();
            RuleFor(x => x.BabyBirthDay).NotEmpty().NotNull();
            RuleFor(x => x.BabyBirthPlace).NotEmpty().NotNull();
            RuleFor(x => x.BabyApgarScore).NotEmpty().NotNull();
            RuleFor(x => x.BabyBirthTime).NotEmpty().NotNull();
            RuleFor(x => x.BabyBirthType).NotEmpty().NotNull();
            RuleFor(x => x.BabyBirthMedicine).NotEmpty().NotNull();
            RuleFor(x => x.MotherBreastfeedBefore).NotEmpty().NotNull();
        }
    }
}

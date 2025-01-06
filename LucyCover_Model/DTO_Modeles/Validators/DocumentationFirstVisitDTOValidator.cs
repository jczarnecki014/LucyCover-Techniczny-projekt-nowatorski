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
            RuleFor(x => x.MotherFirstName).NotEmpty().NotNull().MaximumLength(25);
            RuleFor(x => x.MotherLastName).NotEmpty().NotNull().MaximumLength(25);
            RuleFor(x => x.MotherAge).NotEmpty().NotNull().MaximumLength(10);
            RuleFor(x => x.MotherProfesion).NotEmpty().NotNull().MaximumLength(50);
            RuleFor(x => x.MotherAddress).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(x => x.BabyFirstName).NotEmpty().NotNull().MaximumLength(25);
            RuleFor(x => x.BabyAge).NotEmpty().NotNull().MaximumLength(10);
            RuleFor(x => x.BabyBirthDay).NotEmpty().NotNull().MaximumLength(15);
            RuleFor(x => x.BabyBirthPlace).NotEmpty().NotNull().MaximumLength(50);
            RuleFor(x => x.BabyApgarScore).NotEmpty().NotNull().MaximumLength(2);
            RuleFor(x => x.BabyBirthTime).NotEmpty().NotNull().MaximumLength(25);
            RuleFor(x => x.BabyBirthType).NotEmpty().NotNull().MaximumLength(25);
            RuleFor(x => x.BabyBirthMedicine).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(x => x.MotherBreastfeedBefore).NotEmpty().NotNull().MaximumLength(25);
        }
    }
}

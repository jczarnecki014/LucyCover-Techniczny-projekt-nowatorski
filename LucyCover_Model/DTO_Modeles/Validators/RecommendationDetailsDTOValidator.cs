using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class RecommendationDetailsDTOValidator: AbstractValidator<RecommendationDetails_DTO>
    {
        public RecommendationDetailsDTOValidator() 
        { 
            RuleFor(x => x.title).NotEmpty().MaximumLength(100);
            RuleFor(x => x.date).NotEmpty().MaximumLength(15);
            RuleFor(x => x.text).NotEmpty().MaximumLength(1000);
        }
    }
}

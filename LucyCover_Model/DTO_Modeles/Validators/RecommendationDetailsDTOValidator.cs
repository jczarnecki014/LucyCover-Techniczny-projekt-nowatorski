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
            RuleFor(x => x.title).NotEmpty().WithMessage("title cannot be empty");
            RuleFor(x => x.date).NotEmpty().WithMessage("date cannot be empty");
            RuleFor(x => x.text).NotEmpty().WithMessage("text cannot be empty");
        }
    }
}

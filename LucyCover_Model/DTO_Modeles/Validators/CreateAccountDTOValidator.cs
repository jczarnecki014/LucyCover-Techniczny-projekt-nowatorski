using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles.Validators
{
    public class CreateAccountDTOValidator : AbstractValidator<CreateAccountDTO>
    {
        public CreateAccountDTOValidator() 
        {
            RuleFor(e => e.email)
                .NotEmpty()
                .NotNull()
                .Matches(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
                .WithMessage("Podany email jest nie poprawny");

            RuleFor(e => e.password)
                .NotEmpty()
                .NotNull()
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
                .WithMessage("Podane haslo nie spełnia wymagań: min. 8 znaków, min. 1 duża litera, min. 1 mała litera,min. 1 cyfra, min. 1 znak specjalny ! ");

            RuleFor(e => e.repassword)
                .NotEmpty()
                .NotNull()
                .Equal(o => o.password)
                .WithMessage("Hasła nie są takie same");

            RuleFor(e => e.firstAndLastName)
                .NotEmpty()
                .NotNull()
                .Custom((value,context) => {
                    if(value == null)
                    {
                        context.AddFailure($"Imie i nazwisko nie może być puste");
                        return;
                    }

                    var splitedName = value.Split(' ');

                    if(splitedName.Length != 2 || splitedName[0].Trim().Length == 0 || splitedName[1].Trim().Length == 0)
                    {
                        context.AddFailure("Imie i nazwisko powinno składać się z 2 członów");
                    }
                });
        }
    }
}

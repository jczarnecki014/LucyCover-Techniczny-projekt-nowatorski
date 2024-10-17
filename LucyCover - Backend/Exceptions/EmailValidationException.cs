using System.ComponentModel.DataAnnotations;

namespace LucyCover___Backend.Exceptions
{
    public class EmailValidationException : ValidationException
    {
        public EmailValidationException(string message) : base(message)
        {
        
        }
    }
}

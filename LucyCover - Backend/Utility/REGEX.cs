using System.Text.RegularExpressions;

namespace LucyCover___Backend.Utility
{
    public static class REGEX
    {
        public static readonly Regex EmailRegex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",RegexOptions.IgnoreCase);
        public static readonly Regex PhoneRegex = new Regex(@"^(\+48|48)?\s?\d{3}\s?\d{3}\s?\d{3}$",RegexOptions.IgnoreCase);
        public static readonly Regex ZipCodeRegex = new Regex(@"^\d{2}-\d{3}$",RegexOptions.IgnoreCase);
    }
}

using System.Text.RegularExpressions;

namespace LucyCover___Backend.Utility
{
    public static class REGEX
    {
        public static readonly Regex EmailRegex = new Regex(
        @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",RegexOptions.IgnoreCase);
    }
}

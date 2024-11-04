using LucyCover_Model.Database_Entities;
using System.Runtime.CompilerServices;

namespace LucyCover___Backend.ExtensionMethods
{
    public static class ExtensionsMethods
    {
        public static string AddSalt(this string value, string salt) 
        {
            string resoult = $"{salt}{value}{salt}";
            return resoult;
        }

        public static IEnumerable<T> ForCurrentUserOnly<T> (this IEnumerable<T> collection, Guid currentUserId) where T : ICurrentUserDependentEntity
        {
            return collection.Where(e => e.patient.userId == currentUserId).ToList();
        } 
    }
}

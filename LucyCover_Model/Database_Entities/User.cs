using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.Database_Entities
{
    public class User : IDbEntity
    {
        public Guid id { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string? avatarSrc { get; set; }

        public ICollection<Patient> patients { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class CreateAccountDTO
    {
        public string email { get; set; }
        public string password { get; set; }
        public string repassword{ get; set; }
        public string firstAndLastName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class AuthenticatedResponseDTO
    {
        public bool isAuthenticated {get; set;}
        public string userName { get; set;}
        public string userRole { get; set;} = "Położna";  // This will be develop in the future
        public DateTime TokenTime { get; set;}
    }
}

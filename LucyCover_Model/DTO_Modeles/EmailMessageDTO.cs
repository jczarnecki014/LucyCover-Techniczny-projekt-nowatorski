using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class EmailMessageDTO
    {
        public DateTime reciveDate { get;set; }
        public string message { get;set;}
        public bool fromSystem { get;set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class RecommendationDetails_DTO
    {
        public Guid? id { get;set;}
        public string? patientFirstName { get; set; }
        public string? patientLastName { get; set; }
        public string date { get; set; }
        public string text { get; set; }
        public string title { get;set;}
    }
}

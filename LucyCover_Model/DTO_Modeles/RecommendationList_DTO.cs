using LucyCover_Model.Database_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class RecommendationList_DTO
    {
        public List<Recommendation> Recommendations { get; set;}
        public string patientFirstName { get;set; }
        public string patientLastName { get;set;}
        public Guid patientId { get;set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class UpsertPatientSheduleDTO
    {
        public Guid id { get; set; }
        public Guid childId { get; set; }
        public Guid patientId { get; set; }
        public string city { get;set; }
        public string street { get;set; }
        public string streetNumber { get;set; }
        public string zipCode { get;set; }
        public string date { get;set; }
        public string clock { get;set; }
        public string description { get;set; }
        public string status { get;set; }
    }
}

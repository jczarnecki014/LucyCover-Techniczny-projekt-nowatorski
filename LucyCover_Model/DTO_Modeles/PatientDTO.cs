using LucyCover_Model.Database_Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class PatientDTO
    {
        public Guid? patientId{ get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string province { get; set; }
        public string zipCode { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string birthDate { get; set; }
        public string BirthPlace { get;set; }
        public List<ChildrenDTO>? children { get; set; }
    }
}

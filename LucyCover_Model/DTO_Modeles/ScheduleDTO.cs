using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class ScheduleDTO
    {
        public Guid id { get; set; }
        public string date { get; set; }
        public string clock { get; set; }
        public string status { get; set; }
        public string city { get; set; }
        public string street { get; set; }
        public string streetNumber { get; set; }
        public string zipCode { get; set; }
        public string description { get; set; }

        public Guid patientId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set;}
        public string birthDate { get; set; }
        public string phoneNumber { get; set;}
        public string email { get; set; }
        public List<ChildrenDTO>? children { get; set; }

        public Guid childId { get; set; }
        public string childFirstName { get; set; }
        public string childLastName { get; set; }
        public string childBirthDate { get; set; }

    }
}

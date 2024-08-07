using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class PatientScheduleDTO
    {
        public PatientDTO patientDetails { get; set; }
        public List<ScheduleDTO> patientVisits{ get; set; }
    }
}

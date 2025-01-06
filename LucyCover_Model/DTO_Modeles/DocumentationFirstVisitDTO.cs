using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class DocumentationFirstVisitDTO
    {

        public string MotherFirstName { get; set; }

        public string MotherLastName { get; set; }

        public string MotherAge { get; set; }

        public string MotherProfesion { get; set; }

        public string MotherAddress { get; set; }

        public string BabyFirstName { get; set; }

        public string BabyAge { get; set; }

        public string BabyBirthDay { get; set; }

        public string BabyBirthPlace { get; set; }

        public string BabyApgarScore { get; set; }

        public string BabyBirthTime { get; set; }

        public string? BabyBirthTime_ADDITIONAL { get; set; }

        public string BabyBirthType { get; set; }

        public string? BabyBirthTypeReason { get; set; }

        public string BabyBirthMedicine { get; set; }

        public string? DocumentationReason { get; set; }

        public string MotherBreastfeedBefore { get; set; }

        public string? MotherBreastfeedBefore_HowLong { get; set; }

        public string? MotherBreastfeedBefore_Why { get; set; }
    }
}

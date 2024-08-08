using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Model.DTO_Modeles
{
    public class EducationMaterialDTO
    {
        public Guid id { get; set; }
        public string title { get; set; }
        public string fileName { get; set; }
        public IFormFile? file { get;set; }
    }
}

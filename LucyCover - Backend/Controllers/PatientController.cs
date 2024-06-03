using Microsoft.AspNetCore.Mvc;
using LucyCover_Model;
using LucyCover_Model.Database_Model;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/patients")]
    public class PatientController : Controller
    {
        [HttpGet]
        public ActionResult<Patient> GetPatients()
        {
            return Ok();

        }
    }
}

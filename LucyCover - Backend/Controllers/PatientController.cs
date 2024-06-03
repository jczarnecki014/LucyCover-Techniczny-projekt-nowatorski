using Microsoft.AspNetCore.Mvc;
using LucyCover_Model;
using LucyCover_Model.Database_Model;
using LucyCover___Backend.Services;


namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/patients")]
    public class PatientController : Controller
    {
        private IPatientService _patientService;
        public PatientController(IPatientService patientService)
        {
        _patientService = patientService;
        }

        [HttpGet]
        public ActionResult<Patient> GetPatients()
        {
            List<Patient> patients = _patientService.GetPatients().ToList();
            return Ok(patients);
        }
    }
}

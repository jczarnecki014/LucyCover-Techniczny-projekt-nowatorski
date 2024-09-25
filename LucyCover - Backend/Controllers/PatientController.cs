using Microsoft.AspNetCore.Mvc;
using LucyCover_Model;
using LucyCover_Model.Database_Model;
using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;

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

        [HttpGet("{patientId}")]
        public ActionResult<Guid> GetPatient([FromRoute] Guid patientId)
        {
            Patient patient = _patientService.GetPatient(patientId);
            return Ok(patient);
        }

        [HttpPost]
        public IActionResult UpsertPatient([FromBody] PatientDTO patient) {
            string patientId = _patientService.UpsertPatient(patient);
            return Created($"/api/patients/{patientId}",null);
        }

    }
}

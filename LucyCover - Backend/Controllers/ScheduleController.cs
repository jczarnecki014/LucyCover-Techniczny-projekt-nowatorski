using LucyCover___Backend.Services;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/schedule")]
    public class ScheduleController : Controller
    {
        private IScheduleService _service;
        public ScheduleController(IScheduleService scheduleService)
        {
            _service = scheduleService;
        }

        [HttpGet("{patientId}")]
        public IActionResult GetPatientVisits([FromRoute] Guid patientId)
        {
            PatientScheduleDTO patientScheduleDTO = _service.GetPatientVisits(patientId);
            return Ok(patientScheduleDTO);
        }
        
        [HttpPost("{patientId}")]
        public IActionResult UpsertPatientVisit([FromRoute] Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO)
        {
            _service.UpserPatientVisit(patientId, upsertPatientSheduleDTO);
            return Ok();
        }

        [HttpPut("{visitId}")]
        public IActionResult UpsertPatientVisit([FromRoute] Guid visitId,[FromQuery] string visitStatus)
        {
            _service.ChangeVisitStatus(visitId,visitStatus);
            return Ok();
        }
    }
}

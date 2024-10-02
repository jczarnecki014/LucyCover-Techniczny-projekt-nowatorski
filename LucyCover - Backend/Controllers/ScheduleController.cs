using LucyCover___Backend.Exceptions;
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


        [HttpGet("{date}")]
        public IActionResult GetVisits([FromRoute] string date)
        {
            List<ScheduleDTO> scheduleDTOs = _service.GetVisitsByDate(date);
            return Ok(scheduleDTOs);
        }

        [HttpGet("month/{month}")]
        public IActionResult GetVisitsInMonth([FromRoute] string month)
        {
            List<string> dateList = _service.GetVisitsByMonth(month);
            return Ok(dateList);
        }

        [HttpGet("patients/{patientId}")]
        public IActionResult GetPatientVisits([FromRoute] Guid patientId)
        {
            PatientScheduleDTO patientScheduleDTO = _service.GetPatientVisits(patientId);
            return Ok(patientScheduleDTO);
        }
       
        
        [HttpPost("{patientId}")]
        public async Task<IActionResult> UpsertPatientVisit([FromRoute] Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO)
        {
            try
            {
                await _service.UpserPatientVisit(patientId, upsertPatientSheduleDTO);
                return Ok();
            }
            catch (EmailValidationException)
            {
                return UnprocessableEntity();
            }
        }


        [HttpPut("{visitId}")]
        public IActionResult UpsertPatientVisit([FromRoute] Guid visitId,[FromQuery] string visitStatus)
        {
            _service.ChangeVisitStatus(visitId,visitStatus);
            return Ok();
        }
        [HttpDelete("{visitId}")]
        public IActionResult DeletePatientVisit([FromRoute] Guid visitId) 
        {
            _service.DeleteVisit(visitId);
            return NoContent();
        }
    }
}

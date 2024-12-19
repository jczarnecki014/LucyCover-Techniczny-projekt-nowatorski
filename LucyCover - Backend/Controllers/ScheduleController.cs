using LucyCover___Backend.Exceptions;
using LucyCover___Backend.Services;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/schedule")]
    public class ScheduleController : Controller
    {
        private IScheduleService _service;
        public ScheduleController(IScheduleService scheduleService)
        {
            _service = scheduleService;
        }


        [HttpGet("{date}")]
        public IActionResult GetVisitsByDate([FromRoute] string date)
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
            await _service.UpserPatientVisit(patientId, upsertPatientSheduleDTO);
            return Created("Visit is created",null);
        }


        [HttpPut("{visitId}")]
        public async Task<IActionResult> ChageVisitStatus([FromRoute] Guid visitId,[FromQuery] string visitStatus)
        {
            await _service.ChangeVisitStatus(visitId,visitStatus);
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

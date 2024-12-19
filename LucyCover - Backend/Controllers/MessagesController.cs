using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/messages")]
    public class MessagesController : Controller
    {
        private readonly IMessagesService _service;
        public MessagesController(IMessagesService messagesService)
        {
            _service = messagesService;
        }

        [HttpGet("patientsList")]
        public ActionResult<List<PatientMessageListElementDTO>> GetPatientList()
        {
            List<PatientMessageListElementDTO> patientsList = _service.GetPatientsForMessageList();
            return Ok(patientsList);
        }

        [HttpGet]
        public async Task<ActionResult<EmailMessageDTO[]>> GetPatientEmails([FromQuery] string patientEmail)
        {
           EmailMessageDTO[] patientEmails = await _service.GetEmailsForPatients(patientEmail);
           return Ok(patientEmails);
        }

        [HttpPost]
        public async Task<ActionResult<EmailMessageDTO>> SendEmail([FromBody] string message, [FromQuery] string patientEmail)
        {
            EmailMessageDTO emailMessagDTO = await _service.SendEmailToPatient(message,patientEmail);
            return Ok(emailMessagDTO);
        }
    }
}

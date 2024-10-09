using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("api/messages")]
    public class MessagesControler : Controller
    {
        private readonly IMessagesService _service;
        public MessagesControler(IMessagesService messagesService)
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
        public async Task<ActionResult<List<EmailMessageDTO>>> GetPatientEmails([FromQuery] string patientEmail)
        {
           List<EmailMessageDTO> patientEmails = await _service.GetEmailsForPatients(patientEmail);
           return Ok(patientEmails);
        }
    }
}

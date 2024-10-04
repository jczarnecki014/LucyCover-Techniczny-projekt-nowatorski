using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("api/messages")]
    public class MessagesControler : Controller
    {
        private readonly IMessagesService _messagesService;
        public MessagesControler(IMessagesService messagesService)
        {
            _messagesService = messagesService;
        }

        [HttpGet("patientsList")]
        public ActionResult<List<PatientMessageListElementDTO>> GetPatientList()
        {
            List<PatientMessageListElementDTO> patientsList = _messagesService.GetPatientsForMessageList();
            return Ok(patientsList);
        }
    }
}

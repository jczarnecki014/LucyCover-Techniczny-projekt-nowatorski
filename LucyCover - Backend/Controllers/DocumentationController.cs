using LucyCover___Backend.Services;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/documentation")]
    public class DocumentationController : Controller
    {
        public IDocumentationService _service { get; set; }
        public DocumentationController(IDocumentationService service)
        {
            _service = service;
        }

        [HttpGet("{patientId}")]
        public ActionResult<DocumentationList_DTO> GetAll([FromRoute] Guid patientId)
        {
            DocumentationList_DTO documentation = _service.GetAll(patientId);
            return Ok(documentation);
        }

        [HttpGet("{patientId}/{documentationId}")]
        public ActionResult<DocumentationDTO> GetDocumentationDetails([FromRoute] Guid patientId, [FromRoute] Guid documentationId)
        {
            DocumentationDTO documentation = _service.GetDocumentationDetails(documentationId,patientId);
            return Ok(documentation);
        }


        [HttpPost("{patientId}")]
        public IActionResult UpsertDocumentation([FromBody] UpsertDocumentationDTO documentationDTO, [FromRoute] Guid patientId)
        {

            if(documentationDTO.First)
            {
                _service.UpsertFirstVisitDocumentation(patientId,documentationDTO);
            }
            else 
            {
                _service.UpsertNextVisitDocumentation(patientId,documentationDTO);
            }
            return Created("Upsert success",null);
        }

        [HttpDelete("{documentationId}")]
        public IActionResult DeleteDocumentation([FromRoute] Guid documentationId) {
            _service.DeleteDocumentation(documentationId);
            return NoContent();
        }
    }
}

using LucyCover___Backend.Services;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/documentation")]
    public class DocumentationController : Controller
    {
        public IDocumentationService _service { get; set; }
        public DocumentationController(IDocumentationService service)
        {
            _service = service;
        }

        [HttpGet("{patientId}")]
        public DocumentationList_DTO GetAll(Guid patientId)
        {
            DocumentationList_DTO documentation = _service.GetAll(patientId);
            return (documentation);
        }

        [HttpGet("{patientId}/{documentationId}")]
        public DocumentationDTO GetDocumentationDetails(Guid documentationId, Guid patientId)
        {
            DocumentationDTO documentation = _service.GetDocumentationDetails(documentationId,patientId);
            return documentation;
        }


        [HttpPost("{patientId}")]
        public IActionResult UpsertDocumentation([FromBody] UpsertDocumentationDTO documentationDTO, [FromRoute] Guid patientId)
        {
            Guid documentationId;

            if(documentationDTO.First)
            {
                documentationId = _service.UpsertFirstVisitDocumentation(patientId,documentationDTO);
            }
            else 
            {
                documentationId = _service.UpsertNextVisitDocumentation(patientId,documentationDTO);
            }
            return Created(documentationId.ToString(),null);
        }

        [HttpDelete("{documentationId}")]
        public IActionResult DeleteDocumentation([FromRoute] Guid documentationId) {
            _service.DeleteDocumentation(documentationId);
            return NoContent();
        }
    }
}

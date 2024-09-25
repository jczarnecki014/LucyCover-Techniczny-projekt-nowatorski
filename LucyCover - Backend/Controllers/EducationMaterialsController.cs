using LucyCover___Backend.Exceptions;
using LucyCover___Backend.Services;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("api/educationMaterials")]
    public class EducationMaterialsController : Controller
    {
        private readonly IEducationMaterialsService _service;
        public EducationMaterialsController(IEducationMaterialsService service)
        {
            _service = service;
        }

        [HttpGet()]
        public ActionResult<EducationMaterials> GetAll()
        {
            List<EducationMaterials> materials =  _service.GetAll();
            return Ok(materials);
        }

        [HttpGet("{materialId}")]
        public ActionResult<List<PatientDTO>> GetAssignedPatients([FromRoute] Guid materialId)
        {
            List<PatientDTO> assignedPatients = _service.GetAssignedPatients(materialId);
            return Ok(assignedPatients);
        }

        [HttpGet("file/{materialId}")]
        public ActionResult GetFiles([FromRoute] Guid materialId)
        {
            EducationMaterials file = _service.DownloadMaterial(materialId);
            byte[] fileBytes = System.IO.File.ReadAllBytes(file.filePath);

            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();
            if(!provider.TryGetContentType(file.fileName,out var contentType)) 
            {
                contentType = "application/octet-stream";
            }
            string fileName = Path.GetFileNameWithoutExtension(file.filePath);
            string encodedValue = Uri.EscapeDataString(fileName);
            Response.Headers.Add("filename",encodedValue);
            return File(fileBytes, contentType,file.fileName);
        }

        [HttpPost]
        public async Task<IActionResult> AddNewMaterial([FromForm] EducationMaterialDTO educationMaterialDTO)
        {
            try 
            {
                await _service.UpsertEducationMaterial(educationMaterialDTO);
                return Created("Element was created",null);
            }
            catch (FileAlreadyExistException exception)
            {
                return Conflict(exception);
            }
        }

        [HttpPost("{materialId}/{patientId}")]
        public async Task<ActionResult> SendMaterialToPatient([FromRoute] Guid materialId,[FromRoute] Guid patientId)
        {
            try
            {
                await _service.AddNewPatientToMaterial(materialId, patientId);
                return Ok();
            }
            catch(InvalidOperationException ex)
            {
                return NotFound(ex);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{materialId}")]
        public ActionResult DeleteMaterial([FromRoute] Guid materialId) 
        {
            try
            {
                _service.DeleteMaterial(materialId);
                return NoContent();
            }
            catch (Exception exception) when (exception is KeyNotFoundException || exception is FileNotFoundException)
            {
                return Conflict(exception);
            }

        }

    }
}

using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/recommendation")]
    public class RecommendationController : Controller
    {
        private IRecommendationService _sevice { get; set;}
        public RecommendationController(IRecommendationService service)
        {
            _sevice = service;
        }

        [HttpGet("{patientId}")]
        public ActionResult<RecommendationList_DTO> GetAll([FromRoute] Guid patientId)
        {
            RecommendationList_DTO recommendationList = _sevice.GetAll(patientId);
            return Ok(recommendationList);
        }
    }
}

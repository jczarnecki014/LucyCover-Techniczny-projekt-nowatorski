﻿using LucyCover___Backend.Services;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/recommendation")]
    public class RecommendationController : Controller
    {
        private IRecommendationService _service { get; set;}
        public RecommendationController(IRecommendationService service)
        {
            _service = service;
        }

        [HttpGet("{patientId}")]
        public ActionResult<RecommendationList_DTO> GetAll([FromRoute] Guid patientId)
        {
            RecommendationList_DTO recommendationList = _service.GetAll(patientId);
            return Ok(recommendationList);
        }

        [HttpGet("{patientId}/{recommendationId}")]
        public ActionResult<RecommendationDetails_DTO> GetAll([FromRoute] Guid patientId, [FromRoute] Guid recommendationId)
        {
            RecommendationDetails_DTO recommendationDetails_DTO = _service.GetDetails(patientId, recommendationId);
            return Ok(recommendationDetails_DTO);
        }

        [HttpPost("{patientId}")]
        public ActionResult UpsertRecommendation(Guid patientId,RecommendationDetails_DTO recommendation)
        {
            Guid recommendationId = _service.UpsertNewRecommendation(patientId, recommendation);
            return Created(recommendationId.ToString(),null);
        }

        [HttpDelete("{recommendationId}")]
        public ActionResult DeleteRecommendation(Guid recommendationId)
        {
            _service.DeleteRecommendation(recommendationId);
            return NoContent();
        }
    }
}

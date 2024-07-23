using AutoMapper;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LucyCover___Backend.Services
{
    public interface IRecommendationService {
        public RecommendationList_DTO GetAll(Guid patientId);
    }
    public class RecommendationService : IRecommendationService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get; set; }
        public RecommendationService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public RecommendationList_DTO GetAll(Guid patientId)
        {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId);
            if(patient == null) 
            {
                throw new KeyNotFoundException("Patient with that patientId does not exist.");
            }

            RecommendationList_DTO recommendationList_DTO = _mapper.Map<RecommendationList_DTO>(patient);

            List<Recommendation> recommendations = _unitOfWork.recommendation.GetAll(reco => reco.patientId == patient.id).ToList();
            recommendationList_DTO.Recommendations = recommendations;

            return recommendationList_DTO;
        }
    }
}

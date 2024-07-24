using AutoMapper;
using FluentValidation;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LucyCover___Backend.Services
{
    public interface IRecommendationService {
        public RecommendationList_DTO GetAll(Guid patientId);
        public RecommendationDetails_DTO GetDetails(Guid patientId,Guid recommendationId);
        public void UpsertNewRecommendation(Guid patientId,RecommendationDetails_DTO recommendation);
        public void DeleteRecommendation(Guid recommendationId);
    }
    public class RecommendationService : IRecommendationService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get; set; }
        private IValidator<RecommendationDetails_DTO> _validator;
        public RecommendationService(IUnitOfWork unitOfWork,IMapper mapper, IValidator<RecommendationDetails_DTO> validator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }

        public RecommendationList_DTO GetAll(Guid patientId)
        {
            Patient patient = GetPatient(patientId);

            RecommendationList_DTO recommendationList_DTO = _mapper.Map<RecommendationList_DTO>(patient);

            List<Recommendation> recommendations = _unitOfWork.recommendation.GetAll(reco => reco.patientId == patient.id).ToList();
            recommendationList_DTO.Recommendations = recommendations;

            return recommendationList_DTO;
        }

        public RecommendationDetails_DTO GetDetails(Guid patientId,Guid recommendationId) 
        {
            Recommendation recommendation = _unitOfWork.recommendation.GetFirstOfDefault(reco => reco.id == recommendationId && reco.patientId 
                                                                                                        == patientId,includeProperties:"patient");
            if(recommendation == null) 
            { 
                throw new KeyNotFoundException("Recommendation with that recommendationId doesn't exist.");
            }

            RecommendationDetails_DTO recommendationDetails_DTO = _mapper.Map<RecommendationDetails_DTO>(recommendation);
            return recommendationDetails_DTO;
        }

        public void UpsertNewRecommendation(Guid patientId,RecommendationDetails_DTO recommendationDTO) 
        {
            Patient patient = GetPatient(patientId);

            bool isValid = _validator.Validate(recommendationDTO).IsValid;

            if(!isValid) 
            {
                throw new BadHttpRequestException("Recived recommendation inputs are not valid!");
            }

            if(recommendationDTO.id is not null)
            {
                //Here will be update functionality in the future
            }

            Recommendation recommendation = _mapper.Map<Recommendation>(recommendationDTO);
            recommendation.patientId = patientId;
            _unitOfWork.recommendation.Add(recommendation);
            _unitOfWork.Save();
        }

        public void DeleteRecommendation(Guid recommendationId) 
        {
            Recommendation recommendation = _unitOfWork.recommendation.GetFirstOfDefault(recommendation => recommendation.id == recommendationId);
            if(recommendation is null)
            {
                throw new KeyNotFoundException("Recommendation with provided recommendationID doesnt exist");
            }
            _unitOfWork.recommendation.Remove(recommendation);
            _unitOfWork.Save();
        }

        public Patient GetPatient(Guid patientId) 
        {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId);
            if(patient is null) 
            {
                throw new KeyNotFoundException("Patient with that patientId does not exist.");
            }

            return patient;
        }

    }
}

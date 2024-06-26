using AutoMapper;
using FluentValidation;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LucyCover___Backend.Services
{
    public interface IDocumentationService
    {
        public DocumentationList_DTO GetAll(Guid patientId);
        public DocumentationDTO GetDocumentationDetails(Guid documentationId,Guid patientId);
    }
    public class DocumentationService : IDocumentationService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get;set; }
        private IValidator<DocumentationFirstVisitDTO> _validator;
        public DocumentationService(IUnitOfWork unitOfWork,IMapper mapper,IValidator<DocumentationFirstVisitDTO>validator) 
        {
            _unitOfWork= unitOfWork;
            _mapper= mapper;
            _validator = validator;
        }

        public DocumentationList_DTO GetAll(Guid patientId)
        {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId);
            if(patient == null)
            {
                throw new KeyNotFoundException("Patient with this id was not found !");
            }

            List<Documentation> documentation = _unitOfWork.documentation.GetAll(document => document.PatientId == patientId,includeProperties:"Child").ToList();
            if(documentation.Count == 0) 
            { 
                throw new KeyNotFoundException("Documentation for this user id were not found !");
            }

            DocumentationList_DTO documentationDTO = new DocumentationList_DTO();
            documentationDTO.patient= patient;
            documentationDTO.documentation = documentation;

            return documentationDTO;
        }

        public DocumentationDTO GetDocumentationDetails(Guid documentationId,Guid patientId)
        {
            Documentation documentation = _unitOfWork.documentation.GetFirstOfDefault(document => document.Id == documentationId,
                                                                                                includeProperties:"DocumentationNextVisit,DocumentationFirstVisit,Child");

            if(documentation == null) 
            {
                throw new KeyNotFoundException("Document for this user id was not found !");
            }

            if(documentation.DocumentationFirstVisit == null && documentation.DocumentationNextVisit== null) 
            {
                throw new KeyNotFoundException("Document details for this user id were not found !");
            }

            if(documentation.PatientId != patientId)
            {
                throw new KeyNotFoundException("Document for this patient was not found");
            }
            DocumentationDTO documentationDTO = _mapper.Map<DocumentationDTO>(documentation);
            return documentationDTO;
        }

        public Guid UpserDocumentation(Guid patientId,UpsertDocumentationDTO documentation) 
        {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId);

            if(patient == null) 
            {
                throw new KeyNotFoundException();
            }

            bool isValid = _validator.Validate(documentation.DocumentationFirstVisit).IsValid;

            if(isValid) 
            {
                
            }




            return new Guid();
        }
    }
}

using AutoMapper;
using FluentValidation;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;


namespace LucyCover___Backend.Services
{
    public interface IDocumentationService
    {
        public DocumentationList_DTO GetAll(Guid patientId);
        public DocumentationDTO GetDocumentationDetails(Guid documentationId,Guid patientId);
        public Guid UpsertFirstVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation);
        public Guid UpsertNextVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation);
        public void DeleteDocumentation(Guid documentationId);
    }
    public class DocumentationService : IDocumentationService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get;set; }
        private IValidator<DocumentationFirstVisitDTO> _firstVisitValidator;
        private IValidator<DocumentationNextVisitDTO> _nextVisitValidator; 
        public DocumentationService(IUnitOfWork unitOfWork,
                                    IMapper mapper,IValidator<DocumentationFirstVisitDTO>firstVisitValidator, 
                                    IValidator<DocumentationNextVisitDTO> nextVisitValidator) 
        {
            _unitOfWork= unitOfWork;
            _mapper= mapper;
            _firstVisitValidator = firstVisitValidator;
            _nextVisitValidator = nextVisitValidator;
        }

        public DocumentationList_DTO GetAll(Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,"children");;

            List<Documentation> documentation = _unitOfWork.documentation.GetAll(document => document.PatientId == patientId,includeProperties:"Child").ToList();
            DocumentationList_DTO documentationDTO = new DocumentationList_DTO();
            documentationDTO.patient= patient;

            if(documentation.Count > 0) 
            { 
                documentationDTO.documentation = documentation;
            }
            else 
            {
                documentationDTO.documentation = new List<Documentation>();
            }


            return documentationDTO;
        }

        public DocumentationDTO GetDocumentationDetails(Guid documentationId,Guid patientId)
        {
            Documentation documentation = GetDocumentation(documentationId,includeProperties:"DocumentationNextVisit,DocumentationFirstVisit,Child");

            if(documentation.DocumentationFirstVisit == null && documentation.DocumentationNextVisit== null) 
            {
                throw new KeyNotFoundException("Document details for this user id were not found !");
            }

            if(documentation.PatientId != patientId)
            {
                throw new KeyNotFoundException("Document for this patient was not found");
            }

            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId,includeProperties:"children");

            DocumentationDTO documentationDTO = _mapper.Map<DocumentationDTO>(documentation);
            documentationDTO.ChildrenList = patient.children.ToList();
            return documentationDTO;
        }
        public Guid UpsertFirstVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation) 
        {
            PatientService.GetPatient(patientId,_unitOfWork);

            bool isValid = _firstVisitValidator.Validate(documentation.DocumentationFirstVisit).IsValid;

            if(!isValid) 
            {
               throw new ValidationException("Documentation details are not correct");
            }

            Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
            DocumentationFirstVisit newFirstVistDocumentation = _mapper.Map<DocumentationFirstVisit>(documentation.DocumentationFirstVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = _unitOfWork.documentation.GetFirstOfDefault(prop => prop.Id == documentation.DocumentationId,includeProperties:"DocumentationFirstVisit");
                currentDocumentation.DocumentationFirstVisit = newFirstVistDocumentation;
                currentDocumentation.Date = documentation.Date;
                currentDocumentation.ChildId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                newDocumentation.PatientId = patientId;
                newFirstVistDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationFirstVisit.Add(newFirstVistDocumentation);
            }

            _unitOfWork.Save();

            return newDocumentation.Id;
        }

        public Guid UpsertNextVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation)
        {
            PatientService.GetPatient(patientId,_unitOfWork);
            bool isValid = _nextVisitValidator.Validate(documentation.DocumentationNextVisit).IsValid;

            if(!isValid) 
            {
               throw new ValidationException("Documentation details are not correct");
            }

            Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
            DocumentationNextVisit newNextVisitDocumentation = _mapper.Map<DocumentationNextVisit>(documentation.DocumentationNextVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = _unitOfWork.documentation.GetFirstOfDefault(prop => prop.Id == documentation.DocumentationId,includeProperties:"DocumentationNextVisit");
                currentDocumentation.DocumentationNextVisit = newNextVisitDocumentation;
                currentDocumentation.Date = documentation.Date;
                currentDocumentation.ChildId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                newDocumentation.PatientId = patientId;
                newNextVisitDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationNextVisit.Add(newNextVisitDocumentation);
            }

            _unitOfWork.Save();

            return new Guid();
        }

        public void DeleteDocumentation(Guid documentationId) {
            Documentation documentation = GetDocumentation(documentationId);
            _unitOfWork.documentation.Remove(documentation);
            _unitOfWork.Save();
        }

        public Documentation GetDocumentation(Guid documentationId, string? includeProperties=null) 
        {
             Documentation documentation = _unitOfWork.documentation.GetFirstOfDefault(doc => doc.Id == documentationId,includeProperties:includeProperties);
             if(documentation == null) {
                throw new KeyNotFoundException("Document for this user id was not found !");
             }

             return documentation;
        }


    }
}

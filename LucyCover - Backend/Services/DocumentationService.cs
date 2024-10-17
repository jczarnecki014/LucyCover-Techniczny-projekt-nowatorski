using AutoMapper;
using FluentValidation;
using LucyCover___Backend.Exceptions;
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
        private readonly Guid _loggedUser;
        public DocumentationService(IUnitOfWork unitOfWork,
                                    IMapper mapper,IValidator<DocumentationFirstVisitDTO>firstVisitValidator, 
                                    IValidator<DocumentationNextVisitDTO> nextVisitValidator, IAuthenticationService authenticationService) 
        {
            _unitOfWork= unitOfWork;
            _mapper= mapper;
            _firstVisitValidator = firstVisitValidator;
            _nextVisitValidator = nextVisitValidator;
            _loggedUser = authenticationService.GetCurrentUserId();
        }

        public DocumentationList_DTO GetAll(Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,"children");
            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");

            List<Documentation> documentation = _unitOfWork.documentation.GetAll(document => document.patientId == patient.id,includeProperties:"child").ToList();
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
            Documentation documentation = GetDocumentation(documentationId,includeProperties:"documentationNextVisit,documentationFirstVisit,child,patient");
            if(documentation.patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");

            if(documentation.documentationFirstVisit == null && documentation.documentationNextVisit== null) 
            {
                throw new EntityNotFoundException("Document details for this user id were not found !");
            }

            if(documentation.patientId != patientId)
            {
                throw new EntityNotFoundException("Document for this patient was not found");
            }

            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId,includeProperties:"children");

            DocumentationDTO documentationDTO = _mapper.Map<DocumentationDTO>(documentation);
            documentationDTO.ChildrenList = patient.children.ToList();
            return documentationDTO;
        }
        public Guid UpsertFirstVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation) 
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork);
            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");

            bool isValid = _firstVisitValidator.Validate(documentation.DocumentationFirstVisit).IsValid;

            if(!isValid) 
            {
               throw new BadHttpRequestException("Documentation details are not correct");
            }

            Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
            DocumentationFirstVisit newFirstVistDocumentation = _mapper.Map<DocumentationFirstVisit>(documentation.DocumentationFirstVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = _unitOfWork.documentation.GetFirstOfDefault(prop => prop.id == documentation.DocumentationId,includeProperties:"documentationFirstVisit");
                currentDocumentation.documentationFirstVisit = newFirstVistDocumentation;
                currentDocumentation.date = documentation.Date;
                currentDocumentation.childId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                newDocumentation.patientId = patientId;
                newFirstVistDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationFirstVisit.Add(newFirstVistDocumentation);
            }

            _unitOfWork.Save();

            return newDocumentation.id;
        }

        public Guid UpsertNextVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork);
            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");

            bool isValid = _nextVisitValidator.Validate(documentation.DocumentationNextVisit).IsValid;

            if(!isValid) 
            {
               throw new ValidationException("Documentation details are not correct");
            }

            Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
            DocumentationNextVisit newNextVisitDocumentation = _mapper.Map<DocumentationNextVisit>(documentation.DocumentationNextVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = _unitOfWork.documentation.GetFirstOfDefault(prop => prop.id == documentation.DocumentationId,includeProperties:"documentationNextVisit");
                currentDocumentation.documentationNextVisit = newNextVisitDocumentation;
                currentDocumentation.date = documentation.Date;
                currentDocumentation.childId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                newDocumentation.patientId = patientId;
                newNextVisitDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationNextVisit.Add(newNextVisitDocumentation);
            }

            _unitOfWork.Save();

            return new Guid();
        }

        public void DeleteDocumentation(Guid documentationId) {
            Documentation documentation = GetDocumentation(documentationId,includeProperties:"patient");
            if(documentation.patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");
            _unitOfWork.documentation.Remove(documentation);
            _unitOfWork.Save();
        }

        public Documentation GetDocumentation(Guid documentationId, string? includeProperties=null) 
        {
             Documentation documentation = _unitOfWork.documentation.GetFirstOfDefault(doc => doc.id == documentationId,includeProperties:includeProperties);
             if(documentation == null) {
                throw new EntityNotFoundException("Document for this user id was not found !");
             }

             return documentation;
        }


    }
}

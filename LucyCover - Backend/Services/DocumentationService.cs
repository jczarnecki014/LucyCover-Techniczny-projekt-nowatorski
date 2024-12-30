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
        public void UpsertFirstVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation);
        public void UpsertNextVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation);
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
            documentationDTO.documentation = documentation;

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

            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId,includeProperties:"children");

            DocumentationDTO documentationDTO = _mapper.Map<DocumentationDTO>(documentation);
            documentationDTO.ChildrenList = patient.children.ToList();
            return documentationDTO;
        }
        public void UpsertFirstVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation) 
        {
            PatientValidation(patientId);

            CheckDocumentationIsValid<DocumentationFirstVisitDTO>(_firstVisitValidator,documentation.DocumentationFirstVisit);

            DocumentationFirstVisit newFirstVistDocumentation = _mapper.Map<DocumentationFirstVisit>(documentation.DocumentationFirstVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = GetDocumentation(documentation.DocumentationId,includeProperties:"documentationFirstVisit");
                if(currentDocumentation.patientId != patientId) throw new UnauthorizedAccessException("User canot acces to documentation");

                currentDocumentation.documentationFirstVisit = newFirstVistDocumentation;
                currentDocumentation.date = documentation.Date;
                currentDocumentation.childId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
                newDocumentation.patientId = patientId;
                newFirstVistDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationFirstVisit.Add(newFirstVistDocumentation);
            }

            _unitOfWork.Save();

        }

        public void UpsertNextVisitDocumentation(Guid patientId,UpsertDocumentationDTO documentation)
        {
            PatientValidation(patientId);

            CheckDocumentationIsValid<DocumentationNextVisitDTO>(_nextVisitValidator,documentation.DocumentationNextVisit);

            DocumentationNextVisit newNextVisitDocumentation = _mapper.Map<DocumentationNextVisit>(documentation.DocumentationNextVisit);

            if(documentation.DocumentationId != Guid.Empty) 
            {
                Documentation currentDocumentation = GetDocumentation(documentation.DocumentationId,includeProperties:"documentationNextVisit");
                if(currentDocumentation.patientId != patientId) throw new UnauthorizedAccessException("User canot acces to documentation");

                currentDocumentation.documentationNextVisit = newNextVisitDocumentation;
                currentDocumentation.date = documentation.Date;
                currentDocumentation.childId = Guid.Parse(documentation.ChildId);
            }
            else 
            {
                Documentation newDocumentation = _mapper.Map<Documentation>(documentation);
                newDocumentation.patientId = patientId;
                newNextVisitDocumentation.Documentation = newDocumentation;
                _unitOfWork.documentationNextVisit.Add(newNextVisitDocumentation);
            }

            _unitOfWork.Save();
        }

        public void DeleteDocumentation(Guid documentationId) {
            Documentation documentation = GetDocumentation(documentationId,includeProperties:"patient");
            if(documentation.patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");
            _unitOfWork.documentation.Remove(documentation);
            _unitOfWork.Save();
        }

        private Documentation GetDocumentation(Guid documentationId, string? includeProperties=null) 
        {
             Documentation documentation = _unitOfWork.documentation.GetFirstOfDefault(doc => doc.id == documentationId,includeProperties:includeProperties);

             if(documentation == null) {
                throw new EntityNotFoundException("Document with provided Id does not exist");
             }

             return documentation;
        }

        private void CheckDocumentationIsValid<T>(IValidator<T> validator,T model ) where T : class 
        {
            bool isValid = validator.Validate(model).IsValid;
            var test = validator.Validate(model);

            if(!isValid) 
            {
               throw new BadHttpRequestException("Documentation details are not correct");
            }
        }

        private void PatientValidation(Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork);
            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not acces to this resources");
        }



    }
}

using AutoMapper;
using FluentValidation;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using LucyCover_Model.DTO_Modeles.Validators;
using Microsoft.IdentityModel.Tokens;

namespace LucyCover___Backend.Services
{
    public interface IPatientService
    {
        public IEnumerable<Patient> GetPatients();
        public string CreatePatient(AddPatient_DTO patient);
        public Patient GetPatient(Guid patientId);
    }
    public class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<AddPatient_DTO> _validator;
        public PatientService(IUnitOfWork unitOfWork,IMapper mapper, IValidator<AddPatient_DTO> validator) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }
        public IEnumerable<Patient> GetPatients()
        {
          IEnumerable<Patient> patients = _unitOfWork.patient.GetAll(includeProperties:"children");
          return patients;
        }

        public Patient GetPatient(Guid patientId) {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id== patientId,includeProperties:"children");
            if(patient == null) {
                throw new KeyNotFoundException("User with this ID does not exist");
            }
            return patient;
        }

        public string CreatePatient(AddPatient_DTO formDTO)
        {
            Patient patient = _mapper.Map<Patient>(formDTO);
            bool isValid = _validator.Validate(formDTO).IsValid;
            if(!isValid)
            {
                throw new BadHttpRequestException("Recived paitent inputs are not valid!");
            }
            _unitOfWork.patient.Add(patient);
            _unitOfWork.Save();
            return patient.id.ToString();
        }
    }
}

using AutoMapper;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;


namespace LucyCover___Backend.Services
{
    public interface IPatientService
    {
        public IEnumerable<Patient> GetPatients();
    }
    public class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PatientService(IUnitOfWork unitOfWork,IMapper mapper) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public IEnumerable<Patient> GetPatients()
        {
          IEnumerable<Patient> patients = _unitOfWork.patient.GetAll();
          return patients;
        }

    }
}

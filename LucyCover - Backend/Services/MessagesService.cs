using AutoMapper;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;

namespace LucyCover___Backend.Services
{
    public interface IMessagesService
    {
        List<PatientMessageListElementDTO> GetPatientsForMessageList();
    }

    public class MessagesService : IMessagesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public MessagesService(IUnitOfWork unitOfWork, IPatientService patientService, IMapper mapper)
        {
        _unitOfWork = unitOfWork;
        _patientService = patientService;
        _mapper = mapper;
        }

        public List<PatientMessageListElementDTO> GetPatientsForMessageList()
        {
        IEnumerable<Patient> patients = _patientService.GetPatients();
        List<PatientMessageListElementDTO> patientList = _mapper.Map<List<PatientMessageListElementDTO>>(patients);
        return patientList;
        }
    }
}

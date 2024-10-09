using AutoMapper;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using MimeKit;
using System.Globalization;

namespace LucyCover___Backend.Services
{
    public interface IMessagesService
    {
        public List<PatientMessageListElementDTO> GetPatientsForMessageList();
        public Task<List<EmailMessageDTO>> GetEmailsForPatients(string patientEmail);
    }

    public class MessagesService : IMessagesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPatientService _patientService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public MessagesService(IUnitOfWork unitOfWork, IPatientService patientService, IMapper mapper, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _patientService = patientService;
            _mapper = mapper;
            _emailService = emailService;
        }

        public List<PatientMessageListElementDTO> GetPatientsForMessageList()
        {
            IEnumerable<Patient> patients = _patientService.GetPatients();
            List<PatientMessageListElementDTO> patientList = _mapper.Map<List<PatientMessageListElementDTO>>(patients);
            GetEmailsForPatients("czarnecki.web@outlook.com");
            return patientList;
        }

        public async Task<List<EmailMessageDTO>> GetEmailsForPatients(string patientEmail)
        {
            List<MimeMessage> emailsList =  await _emailService.ReciveEmailsAsync(patientEmail);
            IEnumerable<MimeMessage> orderedEmails = emailsList.OrderByDescending(m => m.Date);
            foreach(MimeMessage email in orderedEmails) 
            {
                int index = email.TextBody.IndexOf("Od");
                if(index != -1) 
                {
                    string result = email.TextBody.Substring(index).Trim();
                }
            }

            List<EmailMessageDTO> patientEmailsDTO = _mapper.Map<List<EmailMessageDTO>>(orderedEmails);
            return patientEmailsDTO;
        }
    }
}

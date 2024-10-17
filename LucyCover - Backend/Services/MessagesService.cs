using AutoMapper;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using MimeKit;
using System.Globalization;
using System.Text;

namespace LucyCover___Backend.Services
{
    public interface IMessagesService
    {
        public List<PatientMessageListElementDTO> GetPatientsForMessageList();
        public Task<EmailMessageDTO[]> GetEmailsForPatients(string patientEmail);
        public Task<EmailMessageDTO>SendEmailToPatient(string message, string patientEmail);
    }

    public class MessagesService : IMessagesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPatientService _patientService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public MessagesService(IUnitOfWork unitOfWork, IPatientService patientService, IMapper mapper, IEmailService emailService, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _patientService = patientService;
            _mapper = mapper;
            _emailService = emailService;
            _configuration = configuration;
        }

        public List<PatientMessageListElementDTO> GetPatientsForMessageList()
        {
            IEnumerable<Patient> patients = _patientService.GetPatients();
            List<PatientMessageListElementDTO> patientList = _mapper.Map<List<PatientMessageListElementDTO>>(patients);
            return patientList;
        }

        public async Task<EmailMessageDTO[]> GetEmailsForPatients(string patientEmail)
        {
            List<MimeMessage> emailsList =  await _emailService.ReciveEmailsAsync(patientEmail);
            IEnumerable<MimeMessage> orderedEmails = emailsList.OrderByDescending(m => m.Date);
            EmailMessageDTO[] patientEmailsDTO = _mapper.Map<EmailMessageDTO[]>(orderedEmails);

            foreach(EmailMessageDTO email in patientEmailsDTO) 
            {
                string result = TryToCovertEmailOnChatMessage(email,patientEmail);

                byte[] defaultBytes = Encoding.Default.GetBytes(result);
                string utf8String = Encoding.UTF8.GetString(defaultBytes);
                email.message = utf8String;
            }
            return patientEmailsDTO;
        }

        public async Task<EmailMessageDTO>SendEmailToPatient(string message, string patientEmail)
        { 
            IEmailMessage email = new EmailMessage(patientEmail,"Wiadomość od twojej położnej",message);
            await _emailService.SendEmailAsync(email);

            EmailMessageDTO emailDTO = new EmailMessageDTO(){
                fromSystem= true,
                message= message,
                reciveDate= DateTime.Now,
            };
            return emailDTO;
        }

        private string TryToCovertEmailOnChatMessage(EmailMessageDTO email,string patientEmail)
        {
            string result = email.message;

            int understrikeIndex = result.IndexOf("___");

            if(understrikeIndex >= 0) 
            {
                result = result.Substring(0,understrikeIndex).Trim();          
            }

            int systemEmailIndex = result.IndexOf(_configuration["Imap:Username"]);

            if(systemEmailIndex > 0) 
            {
                result = result.Substring(0,systemEmailIndex).Trim();      
            }

            int patientEmailIndex = result.IndexOf(patientEmail);

            if(patientEmailIndex > 0) 
            {
                result = result.Substring(0,patientEmailIndex).Trim();      
            }

            return result;
        }
    }
}

using AutoMapper;
using FluentValidation;
using LucyCover___Backend.Exceptions;
using LucyCover___Backend.ExtensionMethods;
using LucyCover___Backend.Utility;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using LucyCover_Model.DTO_Modeles.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LucyCover___Backend.Services
{
    public interface IScheduleService
    {
        public PatientScheduleDTO GetPatientVisits(Guid patientId);
        public Task UpserPatientVisit(Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO);
        public void ChangeVisitStatus(Guid visitId, string visitStatus);
        public List<ScheduleDTO> GetVisitsByDate(string date); 
        public List<string> GetVisitsByMonth(string month);
        public void DeleteVisit(Guid visitId);
    }
    public class ScheduleService : IScheduleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IAuthenticationService _authenticationService;
        private readonly Guid _loggedUser;

        public ScheduleService(IUnitOfWork unitOfWork,IMapper mapper,IEmailService emailService,IAuthenticationService authenticationService) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
            _loggedUser = authenticationService.GetCurrentUserId();
        }
       
        public PatientScheduleDTO GetPatientVisits(Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,includeProperties:"children");

            List<Schedule> schedules = 
                _unitOfWork.schedule.GetAll(schedule => schedule.patientId == patientId,includeProperties:"patient,child")
                .ForCurrentUserOnly(_loggedUser)
                .ToList();

            PatientScheduleDTO patientScheduleDTO = new PatientScheduleDTO();

            patientScheduleDTO.patientDetails = _mapper.Map<PatientDTO>(patient);
            patientScheduleDTO.patientVisits = _mapper.Map<List<ScheduleDTO>>(schedules);
            return patientScheduleDTO;
        }

        public List<ScheduleDTO> GetVisitsByDate(string date) 
        {
            List<Schedule> schedules = _unitOfWork.schedule.GetAll(schedule => schedule.date == date,includeProperties:"patient,child")
                .ForCurrentUserOnly(_loggedUser)
                .ToList();

            return _mapper.Map<List<ScheduleDTO>>(schedules);
        }

        public List<string> GetVisitsByMonth(string month)
        {
            List<string> dateList = _unitOfWork.schedule
                .GetSpecificColumns((c => c.date.Substring(5,2) == month && c.patient.userId == _loggedUser),s => s.date,distinct:true)
                .ToList();
            return dateList;
        }

        public async Task UpserPatientVisit(Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,includeProperties:"schedules");

            if(patient.userId != _loggedUser)
            {
                throw new UnauthorizedAccessException("Currently logged user can not add visits for this user");
            }

            Schedule schedule = _mapper.Map<Schedule>(upsertPatientSheduleDTO);
            schedule.patientId = patientId;

            if(upsertPatientSheduleDTO.id == Guid.Empty) 
            {
                _unitOfWork.schedule.Add(schedule);
            }
            else 
            {
                _unitOfWork.schedule.Update(schedule);
            }
            _unitOfWork.Save();

            if(upsertPatientSheduleDTO.sendEmail == true)
            {
                IEmailMessage newMessage = new EmailMessage(
                    email: patient.email,
                    subject: upsertPatientSheduleDTO.id == Guid.Empty ? "Masz nową zaplanowaną wizytę położniczą" : "Uwaga ! Nastąpiły zmiany w twojej zaplanowanej wizycie położniczej",
                    message: @$"Szanowny pacjencie, w dniu ,{schedule.date} o godzinie {schedule.clock} na adresie {schedule.city} {schedule.street} {schedule.streetNumber} 
                    odbędzie się wizyta położnicza związana z twoim nowonarodzonym dzieckiem uprzejmie prosimy o obecność w tym terminie lub o zgłoszenie swojej nieobecności położnej środowiskowej. Pozdrawiamy"
                );

                await _emailService.SendEmailAsync(newMessage);
            }
        }

        public void ChangeVisitStatus(Guid visitId, string visitStatus) 
        {
            Schedule existVisit = _unitOfWork.schedule.GetFirstOfDefault(schedule => schedule.id == visitId,includeProperties:"patient");

            if(existVisit == null) 
            {
                throw new EntityNotFoundException("Visit was not found");
            }

            List<string> aviableStatus = new List<string>{GlobalVariables.visitDoneStatus,GlobalVariables.visitPlannedStatus,GlobalVariables.visitCanceledStatus};

            if(aviableStatus.Contains(visitStatus) == false)
            {
                throw new BadHttpRequestException("Invalid recived status");
            }

            if(existVisit.patient.userId != _loggedUser) 
            {
                throw new UnauthorizedAccessException("Currently logged user can not change status for this visit");
            }

            existVisit.status = visitStatus;

            _unitOfWork.Save();
            
        }

        public void DeleteVisit(Guid visitId) 
        {
            Schedule visit =  _unitOfWork.schedule.GetFirstOfDefault(visit => visit.id == visitId,includeProperties:"patient");

            if(visit.patient.userId != _loggedUser) throw new UnauthorizedAccessException("Currently logged user can not delete this visit");

            if(visit is null)
            {
                throw new EntityNotFoundException("Visit with that id does not exist");
            }

            _unitOfWork.schedule.Remove(visit);
            _unitOfWork.Save();
        }
    }
}

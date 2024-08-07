using AutoMapper;
using FluentValidation;
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
        public void UpserPatientVisit(Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO);
        public void ChangeVisitStatus(Guid visitId, string visitStatus);
    }
    public class ScheduleService : IScheduleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ScheduleService(IUnitOfWork unitOfWork,IMapper mapper) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
       
        public PatientScheduleDTO GetPatientVisits(Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,includeProperties:"children");
            List<Schedule> schedules = _unitOfWork.schedule.GetAll(schedule => schedule.patientId == patientId,includeProperties:"patient,child").ToList();

            PatientScheduleDTO patientScheduleDTO = new PatientScheduleDTO();

            patientScheduleDTO.patientDetails = _mapper.Map<PatientDTO>(patient);
            patientScheduleDTO.patientVisits = _mapper.Map<List<ScheduleDTO>>(schedules);
            return patientScheduleDTO;
        }
        public void UpserPatientVisit(Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork,includeProperties:"schedules");
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
        }
        public void ChangeVisitStatus(Guid visitId, string visitStatus) 
        {
            Schedule existVisit = _unitOfWork.schedule.GetFirstOfDefault(schedule => schedule.id == visitId);

            if(existVisit == null) 
            {
                throw new KeyNotFoundException("Visit was not found");
            }

            List<string> aviableStatus = new List<string>{GlobalVariables.visitDoneStatus,GlobalVariables.visitPlannedStatus,GlobalVariables.visitCanceledStatus};

            if(aviableStatus.Contains(visitStatus) == false)
            {
                throw new BadHttpRequestException("Invalid recived status");
            }

            existVisit.status = visitStatus;

            _unitOfWork.Save();
            
        }

    }
}

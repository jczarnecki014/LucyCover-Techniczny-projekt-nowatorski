﻿using AutoMapper;
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

        public ScheduleService(IUnitOfWork unitOfWork,IMapper mapper,IEmailService emailService) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
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

        public List<ScheduleDTO> GetVisitsByDate(string date) 
        {
            /*List<Schedule> schedules = _unitOfWork.schedule.GetAll(schedule => schedule.date == date,includeProperties:"patient,child").ToList();*/
            List<Schedule> schedules = _unitOfWork.schedule.GetAll(schedule => schedule.date == date,includeProperties:"patient,child").ToList();
            return _mapper.Map<List<ScheduleDTO>>(schedules);
        }

        public List<string> GetVisitsByMonth(string month)
        {
            List<string> dateList = _unitOfWork.schedule.GetSpecificColumns(c => c.date.Substring(5,2) == month,s => s.date,distinct:true).ToList();
            return dateList;
        }

        public async Task UpserPatientVisit(Guid patientId,[FromBody] UpsertPatientSheduleDTO upsertPatientSheduleDTO)
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

            if(upsertPatientSheduleDTO.sendEmail == true)
            {
                IEmailMessage newMessage = new EmailMessage(
                    email: patient.email,
                    subject: "Masz nową zaplanowaną wizytę położniczą",
                    message: @$"Szanowny pacjencie, w dniu ,{schedule.date} o godzinie {schedule.clock} na adresie {schedule.city} {schedule.street} {schedule.streetNumber} 
                    odbędzie się wizyta położnicza związana z twoim nowonarodzonym dzieckiem uprzejmie prosimy o obecność w tym terminie lub o zgłoszenie swojej nieobecności położnej środowiskowej. Pozdrawiamy"
                );

                await _emailService.SendEmailAsync(newMessage);
            }
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

        public void DeleteVisit(Guid visitId) 
        {
           Schedule visit =  _unitOfWork.schedule.GetFirstOfDefault(visit => visit.id == visitId);

            if(visit is null)
            {
                throw new KeyNotFoundException();
            }

            _unitOfWork.schedule.Remove(visit);
            _unitOfWork.Save();
        }
    }
}

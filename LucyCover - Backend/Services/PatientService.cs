﻿using AutoMapper;
using FluentValidation;
using LucyCover___Backend.Exceptions;
using LucyCover_Database;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using LucyCover_Model.DTO_Modeles.Validators;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace LucyCover___Backend.Services
{
    public interface IPatientService
    {
        public IEnumerable<Patient> GetPatients();
        public string UpsertPatient(PatientDTO patient);
        public Patient GetPatient(Guid patientId);
    }
    public class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<PatientDTO> _validator;
        private readonly Guid _loggedUser;
        public PatientService(IUnitOfWork unitOfWork,IMapper mapper, IValidator<PatientDTO> validator,IAuthenticationService authenticationService) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
            _loggedUser = authenticationService.GetCurrentUserId();
        }
        public IEnumerable<Patient> GetPatients()
        {
          IEnumerable<Patient> patients = _unitOfWork.patient.GetAll(patient => patient.userId == _loggedUser ,includeProperties:"children");
          return patients;
        }

        public Patient GetPatient(Guid patientId) {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId, includeProperties: "children");

            if (patient == null) 
            {
                throw new EntityNotFoundException("User with this ID does not exist");
            }

            if (patient.userId != _loggedUser) throw new UnauthorizedAccessException("Current user has not permission to this patient !");

            return patient;
        }

        public string UpsertPatient(PatientDTO formDTO)
        {
            bool isValid = _validator.Validate(formDTO).IsValid;
            if(!isValid)
            {
                throw new BadHttpRequestException("Recived paitent inputs are not valid!");
            }

            Patient patient = _mapper.Map<Patient>(formDTO);

            patient.userId = _loggedUser;

            if(formDTO.patientId != null)
            {
                //If user try to remove children, system delete existing visits for this children also
                var dbPatient = _unitOfWork.patient.GetFirstOfDefault(p => p.id == formDTO.patientId);
                if(dbPatient.userId != _loggedUser) throw new UnauthorizedAccessException("Current user has not permission to this user !");

                var childrenInDb = _unitOfWork.patient.GetFirstOfDefault(p => p.id == formDTO.patientId,includeProperties:"children").children.ToList();
                var childrenToDelete = childrenInDb.Where(c => !formDTO.children.Any(p => p.id == c.id)).ToList(); //Get children in db which are not in formDTO (They will delete)
                var schedulesForChildrenToDelete = _unitOfWork.schedule.GetAll(s => childrenToDelete.Select(p => p.id).Contains(s.childId)).ToList(); //Get visits/schedules for this children
    
                 _unitOfWork.schedule.RemoveRange(schedulesForChildrenToDelete);
                 _unitOfWork.patient.Update(patient);
            }
            else
            {
                _unitOfWork.patient.Add(patient);
            }

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateException ex)
            {
                throw new RelationBetweenEntityException(ex.Message);
            }

        return patient.id.ToString();
        }

         public static Patient GetPatient(Guid patientId,IUnitOfWork _unitOfWork, string? includeProperties = null) 
         {
            Patient patient = _unitOfWork.patient.GetFirstOfDefault(patient => patient.id == patientId,includeProperties);

            if(patient == null) 
            {
                throw new EntityNotFoundException("Patient with this id was not found !");
            }

            return patient;
         }
    }
}

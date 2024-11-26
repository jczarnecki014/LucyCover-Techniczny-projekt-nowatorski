using AutoMapper;
using FluentValidation;
using LucyCover___Backend.Exceptions;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LucyCover___Backend.Services
{
    public interface IEducationMaterialsService {
        public List<EducationMaterials> GetAll(); 
        public List<PatientDTO> GetAssignedPatients(Guid materialId);
        public Task AddNewPatientToMaterial(Guid patientId,Guid materialId);
        public EducationMaterials DownloadMaterial(Guid educationMaterialId);
        public Task UpsertEducationMaterial(EducationMaterialDTO educationMaterialDTO);
        public void DeleteMaterial(Guid materialId);
    }
    public class EducationMaterialsService : IEducationMaterialsService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get; set; }
        private IWebHostEnvironment _webHostEnvironment { get; set; }
        private IEmailService _emailService { get;set;}
        private readonly Guid _loggedUser;
        public EducationMaterialsService(IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment webHostEnvironment, IEmailService emailService,IAuthenticationService authenticationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _emailService = emailService;
            _loggedUser = authenticationService.GetCurrentUserId();
        }

        public List<EducationMaterials> GetAll() 
        {
            List<EducationMaterials> materials = _unitOfWork.educationMaterials.GetAll(m => m.userId == _loggedUser).ToList();
            return materials;
        }

        public List<PatientDTO> GetAssignedPatients(Guid materialId)
        {
            List<EducationMaterialsAssignedPatients> list = _unitOfWork.educationMaterialsAssignedPatients.GetAll(entity => entity.educationMaterialsId== materialId,includeProperties:"patient").ToList();
            return _mapper.Map<List<PatientDTO>>(list);
        }

        public async Task AddNewPatientToMaterial(Guid materialId,Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork); //patient exisit checking

            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("You can't access to this resources");


            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(material => material.Id== materialId);

            if(material is null || material.userId != _loggedUser)
            {
                throw new EntityNotFoundException("Material with that id doesn't exist or you have not permissions to it");
            }

            if(patient.email.Trim().Length<=0 || patient.email is null) 
            {
                throw new EmailValidationException("Patient does not have email assigned"); 
            }

            bool materialAssignmentPatient = _unitOfWork.educationMaterialsAssignedPatients.Any(entity => entity.patientId == patientId && entity.educationMaterialsId == materialId);

            IEmailMessage newMessage = new EmailMessage(
                email: patient.email,
                subject: "Otrzymałeś materiały edukacyjne od twojego opiekuna ciąży ! - LucyCover",
                message: "Drogi pacjencie, w załączniku przygotowaliśmy dla ciebie materiały, które pomogą Ci lepiej przygotować się do macierzyństwa"
            );

            await _emailService.SendEmailAsync(newMessage,material.filePath);
            if(!materialAssignmentPatient)
            {
                EducationMaterialsAssignedPatients newAssign = new EducationMaterialsAssignedPatients(){patientId=patientId,educationMaterialsId=materialId };
                _unitOfWork.educationMaterialsAssignedPatients.Add(newAssign);
                _unitOfWork.Save();
            }

        }

        public async Task UpsertEducationMaterial(EducationMaterialDTO educationMaterialDTO)
        {
            if(educationMaterialDTO.id == Guid.Empty)
            {
                await AddNewMaterial(educationMaterialDTO);
            }
            else 
            {
                await EditMaterial(educationMaterialDTO);
            }
        }

        public EducationMaterials DownloadMaterial(Guid educationMaterialId)
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == educationMaterialId && m.userId == _loggedUser);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(!File.Exists(material.filePath)) 
            {
                throw new FileNotFoundException();
            }

            return material;
        }

        public void DeleteMaterial(Guid materialId) 
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == materialId && m.userId == _loggedUser);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(!File.Exists(material.filePath))
            {
                throw new FileNotFoundException();
            }

            File.Delete(material.filePath);
            _unitOfWork.educationMaterials.Remove(material);
            _unitOfWork.Save();
        }

        private async Task AddNewMaterial(EducationMaterialDTO educationMaterialDTO)
        {    
                string filePath = await SaveFile(educationMaterialDTO.file);

                if(File.Exists(filePath))
                {
                    EducationMaterials newMaterial = new EducationMaterials() 
                        {
                            fileName = educationMaterialDTO.file.FileName,
                            fileTitle = educationMaterialDTO.title,
                            date = DateTime.Now.ToString("dd.MM.yyyy"),
                            filePath = filePath,
                            userId = _loggedUser,
                        };

                   _unitOfWork.educationMaterials.Add(newMaterial);
                   _unitOfWork.Save();
                }
                else 
                {
                    throw new FileNotFoundException("File does not save in system");
                }

        }

        private async Task EditMaterial(EducationMaterialDTO educationMaterialDTO)
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == educationMaterialDTO.id && m.userId == _loggedUser);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(educationMaterialDTO.file != null) 
            {
                string filePath = await SaveFile(educationMaterialDTO.file);
                File.Delete(material.filePath);
                material.fileName = educationMaterialDTO.file.FileName;
                material.filePath = filePath;
            }
            else
            {
                material.fileTitle = educationMaterialDTO.title;
                material.date = DateTime.Now.ToString("dd.MM.yyyy");
            }
            _unitOfWork.educationMaterials.Update(material);
            _unitOfWork.Save();
        }

        private async Task<string> SaveFile(IFormFile file)
        {
            if(file is not null && file.Length > 0) 
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath,"Uploads");

                if(!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                string extension = Path.GetExtension(file.FileName);

                string filePath = Path.Combine(uploadsFolder,$"{fileName}-{_loggedUser}.{extension}");

                if(File.Exists(filePath)) throw new FileAlreadyExistException("This file already exist");

                using(FileStream stream = new FileStream(filePath,FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return filePath;
            }
            else 
            {
                throw new ArgumentException("File can not be empty !");
            }
        }

    }
  
}

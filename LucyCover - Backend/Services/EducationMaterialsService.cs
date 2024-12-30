using AutoMapper;
using FluentValidation;
using LucyCover___Backend.Exceptions;
using LucyCover___Backend.Utility;
using LucyCover_Database.Repository.IRepository;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LucyCover___Backend.Services
{
    public interface IEducationMaterialsService {
        public List<EducationMaterials> GetAll(); 
        public List<PatientDTO> GetAssignedPatients(Guid materialId);
        public Task AddNewPatientToMaterial(Guid patientId,Guid materialId);
        public EducationMaterials DownloadMaterial(Guid educationMaterialId);
        public Task<string> UpsertEducationMaterial(EducationMaterialDTO educationMaterialDTO);
        public void DeleteMaterial(Guid materialId);
    }
    public class EducationMaterialsService : IEducationMaterialsService
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper { get; set; }
        private IWebHostEnvironment _webHostEnvironment { get; set; }
        private IEmailService _emailService { get;set;}
        private readonly Guid _loggedUser;
        private readonly string _uploadsDirecotry;
        public EducationMaterialsService(IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment webHostEnvironment, 
                                         IEmailService emailService,IAuthenticationService authenticationService, IOptions<FileServerConfig> fileServerOptions)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _emailService = emailService;
            _loggedUser = authenticationService.GetCurrentUserId();
            _uploadsDirecotry = fileServerOptions.Value.Directory;
        }

        public List<EducationMaterials> GetAll() 
        {
            List<EducationMaterials> materials = _unitOfWork.educationMaterials.GetAll(m => m.userId == _loggedUser).ToList();
            return materials;
        }

        public List<PatientDTO> GetAssignedPatients(Guid materialId)
        {
            var test = _unitOfWork.educationMaterials.GetAll();
            if(!_unitOfWork.educationMaterials.Any(m => m.Id == materialId)) throw new EntityNotFoundException("Material with provided id does not exist");

            List<EducationMaterialsAssignedPatients> list = _unitOfWork.educationMaterialsAssignedPatients.GetAll(entity => entity.educationMaterialsId== materialId,includeProperties:"patient").ToList();
            return _mapper.Map<List<PatientDTO>>(list);
        }

        public async Task AddNewPatientToMaterial(Guid materialId,Guid patientId)
        {
            Patient patient = PatientService.GetPatient(patientId,_unitOfWork); //patient exisit checking

            if(patient.userId != _loggedUser) throw new UnauthorizedAccessException("You can't access to this resources");


            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(material => material.Id== materialId);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id doesn't exist or you have not permissions to it");
            }
            else if (material.userId != _loggedUser)
            {
                throw new UnauthorizedAccessException("You can't access to this resources");
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

        public async Task<string> UpsertEducationMaterial(EducationMaterialDTO educationMaterialDTO)
        {
            string filePath;

            if(educationMaterialDTO.id == Guid.Empty)
            {
               filePath = await AddNewMaterial(educationMaterialDTO);
            }
            else 
            {
               filePath = await EditMaterial(educationMaterialDTO);
            }

            return filePath;
        }

        public EducationMaterials DownloadMaterial(Guid educationMaterialId)
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == educationMaterialId);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(material.userId != _loggedUser) throw new UnauthorizedAccessException();

            if(!File.Exists(material.filePath)) 
            {
                _unitOfWork.educationMaterials.Remove(material);
                throw new FileNotFoundException();
            }

            return material;
        }

        public void DeleteMaterial(Guid materialId) 
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == materialId);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(material.userId != _loggedUser) throw new UnauthorizedAccessException("Material is not assigned to current user");

            if (!File.Exists(material.filePath))
            {
                throw new FileNotFoundException();
            }

            File.Delete(material.filePath);
            _unitOfWork.educationMaterials.Remove(material);
            _unitOfWork.Save();
        }

        private async Task<string> AddNewMaterial(EducationMaterialDTO educationMaterialDTO)
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
                return filePath;
        }

        private async Task<string> EditMaterial(EducationMaterialDTO educationMaterialDTO)
        {
            EducationMaterials material = _unitOfWork.educationMaterials.GetFirstOfDefault(m => m.Id == educationMaterialDTO.id);

            if(material is null)
            {
                throw new EntityNotFoundException("Material with that id does not exist or you have not permissions to edit it");
            }

            if(material.userId != _loggedUser) throw new UnauthorizedAccessException("Access to this material was forbidden !");

            var filePath = material.filePath;

            if(educationMaterialDTO.file != null) 
            {
                filePath = await SaveFile(educationMaterialDTO.file);
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
            return filePath;
        }

        private async Task<string> SaveFile(IFormFile file)
        {
            if(file is not null && file.Length > 0) 
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath,_uploadsDirecotry);

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

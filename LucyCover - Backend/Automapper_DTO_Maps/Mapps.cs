﻿using AutoMapper;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;

namespace LucyCover___Backend.Automapper_DTO_Maps
{
    public class Mapps:Profile
    {
        public Mapps() 
        {
            CreateMap<PatientDTO,Patient>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src=>src.patientId));
            CreateMap<Patient,PatientDTO>()
                .ForMember(dest => dest.patientId, opt => opt.MapFrom(src=>src.id));
            CreateMap<ChildrenDTO,Children>();
            CreateMap<Children,ChildrenDTO>();
            CreateMap<DocumentationFirstVisit,DocumentationFirstVisitDTO>();
            CreateMap<DocumentationFirstVisitDTO,DocumentationFirstVisit>();
            CreateMap<DocumentationNextVisit,DocumentationNextVisitDTO>();
            CreateMap<DocumentationNextVisitDTO,DocumentationNextVisit>();
            CreateMap<Documentation,DocumentationDTO>();
            CreateMap<UpsertDocumentationDTO,Documentation>()
                .ForMember(dest => dest.DocumentationFirstVisit, opt => opt.Ignore())
                .ForMember(dest => dest.DocumentationNextVisit, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt=>opt.MapFrom(src => src.DocumentationId));
            CreateMap<Patient,RecommendationList_DTO>()
                .ForMember(dest => dest.patientFirstName, opt => opt.MapFrom(src => src.firstName))
                .ForMember(dest => dest.patientLastName, opt => opt.MapFrom(src => src.lastName))
                .ForMember(dest => dest.patientId, opt => opt.MapFrom(src => src.id));
            CreateMap<Recommendation,RecommendationDetails_DTO>()
                .ForMember(dest=> dest.patientFirstName, opt => opt.MapFrom(src=> src.patient.firstName))
                .ForMember(dest=> dest.patientLastName, opt => opt.MapFrom(src=> src.patient.lastName));
            CreateMap<RecommendationDetails_DTO,Recommendation>();
            CreateMap<UpsertPatientSheduleDTO,Schedule>();
            CreateMap<Schedule,ScheduleDTO>()
                .ForMember(dest => dest.firstName, opt => opt.MapFrom(src=>src.patient.firstName))
                .ForMember(dest => dest.lastName, opt => opt.MapFrom(src=>src.patient.lastName))
                .ForMember(dest => dest.birthDate, opt => opt.MapFrom(src=>src.patient.birthDate))
                .ForMember(dest => dest.phoneNumber, opt => opt.MapFrom(src=>src.patient.phoneNumber))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src=>src.patient.email))
                .ForMember(dest => dest.children, opt => opt.MapFrom(src=>src.patient.children))
                .ForMember(dest => dest.childFirstName, opt => opt.MapFrom(src=>src.child.childFirstName))
                .ForMember(dest => dest.childLastName, opt => opt.MapFrom(src=>src.child.childLastName))
                .ForMember(dest => dest.childBirthDate, opt => opt.MapFrom(src=>src.child.childBirthDate));
        }
    }
}

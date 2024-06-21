using AutoMapper;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;

namespace LucyCover___Backend.Automapper_DTO_Maps
{
    public class Mapps:Profile
    {
        public Mapps() 
        {
            CreateMap<AddPatient_DTO,Patient>();
            CreateMap<Children_DTO,Children>();
            CreateMap<Children,Children_DTO>();
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
                .ForMember(dest => dest.patientLastName, opt => opt.MapFrom(src => src.lastName));
        }
    }
}

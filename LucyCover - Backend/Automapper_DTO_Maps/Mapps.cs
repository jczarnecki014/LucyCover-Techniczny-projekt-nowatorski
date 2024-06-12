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
            CreateMap<Patient,DocumentationList_DTO>()
                .ForMember(m=>m.patientName, c=>c.MapFrom(src => $"{src.firstName} {src.lastName}"))
                .ForMember(m=> m.documentation,c=>c.Ignore());
            CreateMap<DocumentationFirstVisit,DocumentationFirstVisitDTO>();
            CreateMap<DocumentationNextVisit,DocumentationNextVisitDTO>();
            CreateMap<Documentation,DocumentationDTO>();
        }
    }
}

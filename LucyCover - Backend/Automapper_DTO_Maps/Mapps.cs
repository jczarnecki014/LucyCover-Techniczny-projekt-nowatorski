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
        }
    }
}

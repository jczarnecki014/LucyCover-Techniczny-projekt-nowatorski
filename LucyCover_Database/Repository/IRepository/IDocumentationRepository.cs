using LucyCover_Model.Database_Entities;


namespace LucyCover_Database.Repository.IRepository
{
    public interface IDocumentationRepository:IRepository<Documentation>
    {
        public void Update(Documentation documentation);
    }
}

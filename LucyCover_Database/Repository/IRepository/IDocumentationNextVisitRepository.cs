using LucyCover_Model.Database_Entities;


namespace LucyCover_Database.Repository.IRepository
{
    public interface IDocumentationNextVisitRepository:IRepository<DocumentationNextVisit>
    {
        public void Update(DocumentationNextVisit documentation);
    }
}

using LucyCover_Model.Database_Entities;


namespace LucyCover_Database.Repository.IRepository
{
    public interface IDocumentationFirstVisitRepository:IRepository<DocumentationFirstVisit>
    {
        public void Update(DocumentationFirstVisit documentation);
    }
}

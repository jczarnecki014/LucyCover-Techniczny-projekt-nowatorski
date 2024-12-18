using LucyCover_Database;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Mvc.Testing;
using System.IO;
using System.Reflection.Emit;

namespace LucyCover___Tests.helpers
{
    public static class FakeEntitiesGenerator
    {
        public static T SaveInDatabase<T>(this T entity,WebApplicationFactory<Program>factory) where T : class
        {
            var scopeFactory = factory.Services.GetService<IServiceScopeFactory>();
            using var scope = scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetService<DbConnection>();
            dbContext.Set<T>().Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        public static Schedule GetSchedule(Guid patientId, Guid childId)
        {
            return new Schedule()
            {
                date = "2025.01.01",
                clock = "9:00",
                status = "Zaplanowana",
                city = "test",
                street = "test",
                streetNumber = "test",
                zipCode = "test",
                description = "test",
                patientId = patientId,
                childId = childId,
            };
        }
        public static Patient GetPatient(Guid assignedUserId)
        {
            return new Patient()
            {
                firstName = "test",
                lastName = "test",
                city = "test",
                address = "test",
                province = "test",
                zipCode = "test",
                phoneNumber = "test",
                email = $"test@{Guid.NewGuid()}.pl",
                birthDate = "test",
                birthPlace = "test",
                userId = assignedUserId
            };
        }
        public static Children GetChildren(Guid patientId)
        {
            return new Children()
            {
                childFirstName = "test",
                childLastName = "test",
                childBirthDate= "test",
                childBirthPlace= "test",
                patientId= patientId
            };
        }
        public static RecommendationDetails_DTO GetRecommendationDetails_DTO()
        {
            return new RecommendationDetails_DTO()
            {
                title = "test",
                date = "test",
                text = "test",
            };
        }
        public static Recommendation GetRecommendation(Guid userId)
        {
            return new Recommendation()
            {
                title = "test",
                text = "test",
                date = "test",
                patientId = userId
            };
        }
        public static UpsertPatientSheduleDTO GetUpsertPatientSheduleDTO(Guid patientId, Guid childrenId) 
        { 
            return new UpsertPatientSheduleDTO()
            {
                childId = childrenId,
                patientId = patientId,
                city = "test",
                street = "test",
                streetNumber = "test",
                zipCode = "58-560",
                date = "test",
                clock = "test",
                description = "test",
                status = "test",
                sendEmail = false,
            };
        }

    }
}

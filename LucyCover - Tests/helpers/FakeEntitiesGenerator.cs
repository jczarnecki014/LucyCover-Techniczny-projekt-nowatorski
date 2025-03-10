﻿using AutoMapper;
using LucyCover_Database;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IO;
using System.Reflection.Emit;

namespace LucyCover___Tests.helpers
{
    public static class FakeEntitiesGenerator
    {
        public static T SaveInDatabase<T>(this T entity,WebApplicationFactory<Program>factory) where T : class,IDbEntity
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
        public static Patient GetPatient(Guid assignedUserId,string? providedEmail = null )
        {
            var emailValue = providedEmail ??= $"test123@someaddres.pl";
            return new Patient()
            {
                firstName = "test",
                lastName = "test",
                city = "test",
                address = "test",
                province = "test",
                zipCode = "58-560",
                phoneNumber = "666999888",
                email= emailValue,
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
                zipCode = "58-566",
                date = "10.12.2024",
                clock = "8:00",
                description = "test",
                status = "test",
                sendEmail = false,
            };
        }
        public static PatientDTO GetPatientDTO(Guid? patientId = null)
        {
            return new PatientDTO()
            { 
                patientId = patientId,
                firstName = "test",
                lastName = "test",
                city = "test",
                address = "test",
                province = "test",
                zipCode= "58-666",
                phoneNumber = "666777888",
                email = $"test@test.pl",
                birthDate  = "test",
                BirthPlace = "test",
                children = new List<ChildrenDTO>()
            };
        }
        public static Documentation GetFirstVisitDocumentation(Guid patientId, Guid childrenId) 
        {
            return new Documentation()
            {
                first = true,
                childId = childrenId,
                patientId = patientId,
                date = "test",
                documentationNextVisit = null,
                documentationFirstVisit = new DocumentationFirstVisit()
                {
                    MotherFirstName = "test",
                    MotherLastName = "test",
                    MotherAge = "21",
                    MotherProfesion = "test",
                    MotherAddress =  "test",
                    BabyFirstName = "test",
                    BabyAge = "1ss",
                    BabyBirthDay =  "test",
                    BabyBirthPlace =  "test",
                    BabyApgarScore =  "21",
                    BabyBirthTime =  "test",
                    BabyBirthTime_ADDITIONAL =  "test",
                    BabyBirthType =  "test",
                    BabyBirthTypeReason =  "test",
                    BabyBirthMedicine =  "test",
                    DocumentationReason =  "test",
                    MotherBreastfeedBefore =  "test",
                    MotherBreastfeedBefore_HowLong =  "test",
                    MotherBreastfeedBefore_Why =  "test"
                }
            };
        }
        public static Documentation GetNextVisitDocumentation(Guid patientId, Guid childrenId) 
        {
            return new Documentation()
            {
                first = false,
                childId = childrenId,
                patientId = patientId,
                date = "test",
                documentationFirstVisit = null,
                documentationNextVisit = new DocumentationNextVisit()
                {
                    PatientFeedingCountPerDay = "test",
                    PatientFeedingBreastNumber = "test",
                    PatientFeedingHowMuchTime = "test",
                    PatientFeedingInNight = "test",
                    PatientBreastFeedingWithHood = "test",
                    PatientBreastFeedingWithHood_HowLong = "test",
                    PatientBreastFeedingAsNeeded = "test",
                    PatientBreastFeedingAsNeeded_How = "test",
                    PatientFeedingCountPerDay_DAY1 = "test",
                    PatientFeedingCountPerDay_DAY2 = "test", 
                    PatientFeedingCountPerDay_DAY3 = "test", 
                    PatientFeedingMIXCountPerDay_DAY1 = "test",
                    PatientFeedingMIXCountPerDay_DAY2 = "test",
                    PatientFeedingMIXCountPerDay_DAY3 = "test",
                    PatientFeedingWay = "test",
                    PatientExpressingBreastMilk = "test",
                    PatientExpressingBreastMilkHowManyYesterday= "test",
                    PatientBreastGrowingDuringPregnacy = "test", 
                    PatientBreastGrowingDuringPregnacy_DAY = "test",
                    PatientMilkRush = "test",
                    PatientBreastSize = "test",
                    PatientBreastChanges = "test",
                    PatientBreastChanges_WHAT = "test",
                    PatientBreastNipple = "test",
                    PatientBreastNippleAfterFeeding = "test",
                    PatientBreastNippleChanges = "test",
                    PatientBreastNippleChanges_WHAT = "test",
                    PatientMentalState = "test",
                    ResearchObservationBabyBehaviour = "test",
                    BabyPeeingADay = "test",
                    BabyExcretionADay = "test",
                    BabyColic = "test",
                    BabyColicSinceWhen = "test",
                    BabyNipple = "test",
                    BabyNippleSinceWhen = "test",
                    PatientMedicationsUsed = "test",
                    BabyMedicationsUsed = "test",
                    PatientPeriodAfterDelivery = "test",
                    PatientPeriodAfterDelivery_WHEN = "test",
                    PostureCorection = "test",
                    SuckTraining = "test",
                    BabyFatten = "test",
                    OtherRecommendation = "test",
                }
            };
        }
        public static Documentation GetDocumentation(Guid patientId, Guid childrenId) 
        {
            return new Documentation()
            {
                first = true,
                childId = childrenId,
                patientId = patientId,
                date = "test",
                documentationNextVisit = null,
                documentationFirstVisit = null,
            };
        }
        public static EducationMaterials GetEducationMaterials(Guid userId,string? filePath = "test")
        {
            return new EducationMaterials 
            {
                fileName = "test",
                fileTitle = "test",
                filePath = filePath,
                date = "test",
                userId = userId
            };
        }
        public static EducationMaterialsAssignedPatients GetEducationMaterialsAssignedPatients(Guid educationMaterialsId,Guid patientId)
        {
            return new EducationMaterialsAssignedPatients 
            {
                educationMaterialsId = educationMaterialsId,
                patientId = patientId,
            };
        }
        public static UpsertDocumentationDTO GetUpsertDocumentationDTOForDocumentationFirstVisit(Guid ChildId,Guid existingDoucmentationId)
        {
            return new UpsertDocumentationDTO
            {
                Date="test",
                ChildId = ChildId.ToString(),
                First = true,
                DocumentationId = existingDoucmentationId,
                DocumentationFirstVisit = new DocumentationFirstVisitDTO 
                {
                    MotherFirstName = "test",
                    MotherLastName = "test",
                    MotherAge = "21",
                    MotherProfesion = "test",
                    MotherAddress =  "test",
                    BabyFirstName = "test",
                    BabyAge = "1ss",
                    BabyBirthDay =  "test",
                    BabyBirthPlace =  "test",
                    BabyApgarScore =  "21",
                    BabyBirthTime =  "test",
                    BabyBirthTime_ADDITIONAL =  "test",
                    BabyBirthType =  "test",
                    BabyBirthTypeReason =  "test",
                    BabyBirthMedicine =  "test",
                    DocumentationReason =  "test",
                    MotherBreastfeedBefore =  "test",
                    MotherBreastfeedBefore_HowLong =  "test",
                    MotherBreastfeedBefore_Why =  "test"
                }
            };
        }
        public static UpsertDocumentationDTO GetUpsertDocumentationDTOForDocumentationNextVisit(Guid ChildId,Guid existingDoucmentationId)
        {
            return new UpsertDocumentationDTO
            {
                Date="test",
                ChildId = ChildId.ToString(),
                First = false,
                DocumentationId = existingDoucmentationId,
                DocumentationNextVisit = new DocumentationNextVisitDTO
                {
                    PatientFeedingCountPerDay = "test",
                    PatientFeedingBreastNumber = "test",
                    PatientFeedingHowMuchTime = "test",
                    PatientFeedingInNight = "test",
                    PatientBreastFeedingWithHood = "test",
                    PatientBreastFeedingWithHood_HowLong = "test",
                    PatientBreastFeedingAsNeeded = "test",
                    PatientBreastFeedingAsNeeded_How = "test",
                    PatientFeedingCountPerDay_DAY1 = "3",
                    PatientFeedingCountPerDay_DAY2 = "2", 
                    PatientFeedingCountPerDay_DAY3 = "3", 
                    PatientFeedingMIXCountPerDay_DAY1 = "4",
                    PatientFeedingMIXCountPerDay_DAY2 = "3",
                    PatientFeedingMIXCountPerDay_DAY3 = "3",
                    PatientFeedingWay = "test",
                    PatientExpressingBreastMilk = "test",
                    PatientExpressingBreastMilkHowManyYesterday= "test",
                    PatientBreastGrowingDuringPregnacy = "test", 
                    PatientBreastGrowingDuringPregnacy_DAY = "test",
                    PatientMilkRush = "test",
                    PatientBreastSize = "test",
                    PatientBreastChanges = "test",
                    PatientBreastChanges_WHAT = "test",
                    PatientBreastNipple = "test",
                    PatientBreastNippleAfterFeeding = "test",
                    PatientBreastNippleChanges = "test",
                    PatientBreastNippleChanges_WHAT = "test",
                    PatientMentalState = "test",
                    ResearchObservationBabyBehaviour = "test",
                    BabyPeeingADay = "test",
                    BabyExcretionADay = "test",
                    BabyColic = "test",
                    BabyColicSinceWhen = "test",
                    BabyNipple = "test",
                    BabyNippleSinceWhen = "test",
                    PatientMedicationsUsed = "test",
                    BabyMedicationsUsed = "test",
                    PatientPeriodAfterDelivery = "test",
                    PatientPeriodAfterDelivery_WHEN = "test",
                    PostureCorection = "test",
                    SuckTraining = "test",
                    BabyFatten = "test",
                    OtherRecommendation = "test",
                }
            };
        }
        public static User GetUser(string email, string password) 
        {
            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            var user =  new User();
            user.password = passwordHasher.HashPassword(user,password);
            user.email = email;
            user.firstName="test";
            user.lastName="test";
            user.avatarSrc = "test";
            return user;
        }

    }
}

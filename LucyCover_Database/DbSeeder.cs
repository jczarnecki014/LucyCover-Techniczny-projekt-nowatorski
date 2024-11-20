using Bogus;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;
using LucyCover_Model.DTO_Modeles;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_Database
{
    public class DbSeeder
    {
        private readonly DbConnection _connection;
        private readonly IPasswordHasher<User> _passwordHasher;
        private const string userPassSalt = "646b1a65259763b6c701b7493937e6c3dbde6b09ea7145679b7724a5755718c16eb8ff5e0e7a697a79bea19eb6c51144be86ee8effc03353dad2df1c0dc06ec9";
        private readonly Guid testUserId = new Guid("f85fec77-10a4-4afa-9714-b8bb6f0c4202");
        public DbSeeder(DbConnection connection,IPasswordHasher<User> passwordHasher)
        {
            _connection = connection;
            _passwordHasher = passwordHasher;
        }

        public void PrepareDatabaseStructure(string appMode)
        {
            if(_connection.Database.CanConnect())
            {
                if(_connection.Database.IsRelational())
                {
                    if(_connection.Database.GetPendingMigrations().Any())
                    {
                        _connection.Database.Migrate();
                    }
                }
            }

            if(appMode == "simulation")
            {
                //When database is clear seed simulation entities
            
                if(!(_connection.User.Any() || _connection.Patients.Any() || _connection.Documentation.Any()))
                {
                    User user = LoadTestUser();
                    List<Patient> patients = LoadSimulationPatientsAndChildren(user);
                    List<Documentation> firstVisitsForPatients = LoadSimulationFirstVisitsForPatients(patients);
                    List<Documentation> nextVisitsForPatients = LoadSimulationNextVisitsForPatients(patients);
                    List<Recommendation> recommendationsForPatients = LoadSimulationRecommendationsForPatients(patients);
                    List<Schedule> schedules = LoadSimulationSchedulesForPatients(patients);
                    _connection.AddRange(patients);
                    _connection.AddRange(firstVisitsForPatients);
                    _connection.AddRange(nextVisitsForPatients);
                    _connection.AddRange(recommendationsForPatients);
                    _connection.AddRange(schedules);
                    _connection.SaveChanges();
                }
            }
            else if (appMode == "default")
            {
                // Remove all potential simulation entities form db
                User testUser = _connection.User.FirstOrDefault(u => u.id == testUserId);
                if(testUser is null) return;

                IEnumerable<EducationMaterials> testUserMaterial = _connection.EducationMaterials.Where(m => m.userId == testUserId);
                foreach(var material in testUserMaterial)
                {
                    File.Delete(material.filePath);
                }
                _connection.EducationMaterials.RemoveRange(testUserMaterial);

                _connection.User.Remove(testUser);
                _connection.SaveChanges();
            }

  
        }
        public User LoadTestUser()
        {
            var newUser = new User();

            newUser.id = testUserId;
            newUser.email = "testuser@lucycover.com";
            newUser.firstName = "Test";
            newUser.lastName = "User";
            newUser.password = _passwordHasher.HashPassword(newUser,$"{userPassSalt}test{userPassSalt}");
            newUser.avatarSrc = "";

            return newUser;
        }

        public List<Patient> LoadSimulationPatientsAndChildren(User user) {
            Randomizer.Seed = new Random(911);
            var location = "pl";
            
            // Generator dla klasy Children (dzieci pacjenta)
            var childFaker = new Faker<Children>(location)
                .RuleFor(c => c.id, f => Guid.NewGuid())
                .RuleFor(c => c.childFirstName, f => f.Name.FirstName())
                .RuleFor(c => c.childLastName, f => f.Name.LastName())
                .RuleFor(c => c.childBirthDate, f => f.Date.Past(10, DateTime.Now.AddYears(-1)).ToString("yyyy-MM-dd"))
                .RuleFor(c => c.childBirthPlace, f => f.Address.City());

            // Generator dla klasy Patient (pacjent) z dziećmi
            var patientFaker = new Faker<Patient>(location)
                .RuleFor(p => p.id, f => Guid.NewGuid())
                .RuleFor(p => p.firstName, f => f.Person.FirstName)
                .RuleFor(p => p.lastName, f => f.Person.LastName)
                .RuleFor(p => p.city, f => f.Address.City())
                .RuleFor(p => p.address, f => f.Address.StreetAddress())
                .RuleFor(p => p.province, f => f.Address.State())
                .RuleFor(p => p.zipCode, f => f.Address.ZipCode())
                .RuleFor(p => p.phoneNumber, f => f.Phone.PhoneNumber("###-###-###"))
                .RuleFor(p => p.email, f => f.Internet.Email())
                .RuleFor(p => p.birthDate, f => f.Date.Past(30, DateTime.Now.AddYears(-20)).ToString("yyyy-MM-dd"))
                .RuleFor(p => p.birthPlace, f => f.Address.City())
                .RuleFor(p => p.user, f => user)
                // Generowanie listy dzieci dla pacjenta
                .RuleFor(p => p.children, f => childFaker.Generate(f.Random.Int(1,4)));
                    
                return patientFaker.Generate(20);           
        }

        public List<Documentation> LoadSimulationFirstVisitsForPatients(List<Patient> patients) {
            Randomizer.Seed = new Random(911);
            var location = "pl";
            List<Documentation> firstVisitsDocumentations = new List<Documentation>();

                foreach(var patient in patients)
                {
                    // Generator dla DocumentationFirstVisit
                    var documentationFirstVisitFaker = new Faker<DocumentationFirstVisit>(location)
                        .RuleFor(d => d.Id, f => Guid.NewGuid())
                        .RuleFor(d => d.MotherFirstName, patient.firstName)
                        .RuleFor(d => d.MotherLastName, patient.lastName)
                        .RuleFor(d => d.MotherAge, f => f.Random.Number(18, 50).ToString())
                        .RuleFor(d => d.MotherProfesion, f => f.Name.JobTitle())
                        .RuleFor(d => d.MotherAddress, patient.address)
                        .RuleFor(d => d.BabyFirstName, f => f.Name.FirstName(Bogus.DataSets.Name.Gender.Male))
                        .RuleFor(d => d.BabyAge, f => f.Random.Number(0, 2).ToString()) // Przykład wieku w latach
                        .RuleFor(d => d.BabyBirthDay, f => f.Date.Past(2, DateTime.Now).ToString("yyyy-MM-dd"))
                        .RuleFor(d => d.BabyBirthPlace, f => f.Address.City())
                        .RuleFor(d => d.BabyApgarScore, f => f.Random.Number(0, 10).ToString())
                        .RuleFor(d => d.BabyBirthTime, f => f.Random.ListItem(new[] { "O czasie", "Wcześniej", "Później" }))
                        .RuleFor(d => d.BabyBirthTime_ADDITIONAL, f => f.Random.Bool() ? f.Date.Recent().ToString("hh:mm tt") : "")
                        .RuleFor(d => d.BabyBirthType, f => f.Random.ListItem(new[] { "Naturalny", "Zabiegowy","Cięcie cesarskie" }))
                        .RuleFor(d => d.BabyBirthTypeReason, f => f.Random.Bool() ? f.Lorem.Sentence() : "")
                        .RuleFor(d => d.BabyBirthMedicine, f => f.Random.ListItem(new[] { "Brak", "Antybiotyk", "Przeciwbólowe" }))
                        .RuleFor(d => d.DocumentationReason, f => f.Lorem.Paragraph())
                        .RuleFor(d => d.MotherBreastfeedBefore, f => f.Random.Bool() ? "Tak" : "Nie")
                        .RuleFor(d => d.MotherBreastfeedBefore_HowLong, f => f.Random.Bool() ? f.Random.Number(1, 36).ToString() + " miesięcy" : "")
                        .RuleFor(d => d.MotherBreastfeedBefore_Why, f => f.Random.Bool() ? f.Lorem.Sentence() : "");

                    var documentationFaker = new Faker<Documentation>(location)
                        .RuleFor(d => d.id, f => Guid.NewGuid())
                        .RuleFor(d => d.patientId, patient.id)
                        .RuleFor(d => d.childId, f => f.Random.ListItem(patient.children.ToList()).id)
                        .RuleFor(d => d.date, f => f.Date.Recent(30).ToString("yyyy-MM-dd"))
                        .RuleFor(d => d.first, true) 
                        .RuleFor(d => d.documentationFirstVisit, documentationFirstVisitFaker.Generate());

                    firstVisitsDocumentations.Add(documentationFaker.Generate());
                }

                return firstVisitsDocumentations;
        }

        public List<Documentation> LoadSimulationNextVisitsForPatients(List<Patient> patients) {
            Randomizer.Seed = new Random(911);
            var location = "pl";
            List<Documentation> nextVisitsDocumentations = new List<Documentation>();

                foreach(var patient in patients)
                {
                    // Generator dla DocumentationNextVisit
                   
                    var documentationFaker = new Faker<Documentation>(location)
                        .RuleFor(d => d.patientId, patient.id)
                        .RuleFor(d => d.childId, f => f.Random.ListItem(patient.children.ToList()).id)
                        .RuleFor(d => d.date, f => f.Date.Recent(30).ToString("yyyy-MM-dd"))
                        .RuleFor(d => d.first, false) 
                        .RuleFor(d => d.documentationNextVisit, f => 
                            new Faker<DocumentationNextVisit>(location)
                                .RuleFor(d => d.PatientFeedingCountPerDay, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingBreastNumber, f => f.Random.Number(1, 2).ToString())
                                .RuleFor(d => d.PatientFeedingHowMuchTime, f => f.Date.Timespan().ToString("c"))
                                .RuleFor(d => d.PatientFeedingInNight, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastFeedingWithHood, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastFeedingWithHood_HowLong, f => f.Random.Bool() ? f.Date.Timespan().ToString("c") : "")
                                .RuleFor(d => d.PatientBreastFeedingAsNeeded, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastFeedingAsNeeded_How, f => f.Lorem.Sentence(5))
                                .RuleFor(d => d.PatientFeedingCountPerDay_DAY1, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingCountPerDay_DAY2, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingCountPerDay_DAY3, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingMIXCountPerDay_DAY1, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingMIXCountPerDay_DAY2, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingMIXCountPerDay_DAY3, f => f.Random.Number(1, 8).ToString())
                                .RuleFor(d => d.PatientFeedingWay, f => f.Random.Word())
                                .RuleFor(d => d.PatientExpressingBreastMilk, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientExpressingBreastMilkHowManyYesterday, f => f.Random.Bool() ? f.Random.Number(1, 10).ToString() : "")
                                .RuleFor(d => d.PatientBreastGrowingDuringPregnacy, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastGrowingDuringPregnacy_DAY, f => f.Random.Bool() ? f.Date.Past(9, DateTime.Now.AddMonths(-6)).ToString("yyyy-MM-dd") : "")
                                .RuleFor(d => d.PatientMilkRush, f => f.Random.Word())
                                .RuleFor(d => d.PatientBreastSize, f => f.Random.Word())
                                .RuleFor(d => d.PatientBreastChanges, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastChanges_WHAT, f => f.Random.Bool() ? f.Lorem.Sentence(1) : "")
                                .RuleFor(d => d.PatientBreastNipple, f => f.Random.Word())
                                .RuleFor(d => d.PatientBreastNippleAfterFeeding, f => f.Random.Word())
                                .RuleFor(d => d.PatientBreastNippleChanges, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientBreastNippleChanges_WHAT, f => f.Random.Bool() ? f.Lorem.Sentence(1) : "")
                                .RuleFor(d => d.PatientMentalState, f => f.Lorem.Sentence(1))
                                .RuleFor(d => d.ResearchObservationBabyBehaviour, f => f.Lorem.Paragraph(1))
                                .RuleFor(d => d.BabyPeeingADay, f => f.Random.Number(1, 10).ToString())
                                .RuleFor(d => d.BabyExcretionADay, f => f.Random.Number(1, 10).ToString())
                                .RuleFor(d => d.BabyColic, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.BabyColicSinceWhen, f => f.Random.Bool() ? f.Date.Past(1).ToString("yyyy-MM-dd") : "")
                                .RuleFor(d => d.BabyNipple, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.BabyNippleSinceWhen, f => f.Random.Bool() ? f.Date.Past(1).ToString("yyyy-MM-dd") : "")
                                .RuleFor(d => d.PatientMedicationsUsed, f => f.Lorem.Word())
                                .RuleFor(d => d.BabyMedicationsUsed, f => f.Lorem.Word())
                                .RuleFor(d => d.PatientPeriodAfterDelivery, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.PatientPeriodAfterDelivery_WHEN, f => f.Random.Bool() ? f.Date.Past(1).ToString("yyyy-MM-dd") : "")
                                .RuleFor(d => d.PostureCorection, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.SuckTraining, f => f.Random.Bool() ? "Yes" : "No")
                                .RuleFor(d => d.BabyFatten, f => f.Lorem.Word())
                                .RuleFor(d => d.OtherRecommendation, f => f.Lorem.Sentence(5))
                                );

                        nextVisitsDocumentations.AddRange(documentationFaker.Generate(5));
                }
                return nextVisitsDocumentations;
        }

        public List<Recommendation> LoadSimulationRecommendationsForPatients(List<Patient> patients)
        {
            Randomizer.Seed = new Random(911);
            var location = "pl";
            List<Recommendation> recommendations = new List<Recommendation>();

            foreach(var patient in patients)
            {
                var recommendationFaker = new Faker<Recommendation>(location)
                .RuleFor(d => d.date, f => f.Date.Recent(30).ToString("yyyy-MM-dd"))
                .RuleFor(d => d.title, f => f.Lorem.Sentence(4))
                .RuleFor(d => d.text, f => f.Lorem.Paragraph(10))
                .RuleFor(d => d.patientId, f => patient.id);

                recommendations.AddRange(recommendationFaker.Generate(10));
            }
            return recommendations;
        }

        public List<Schedule> LoadSimulationSchedulesForPatients(List<Patient> patients)
        {
            Randomizer.Seed = new Random(911);
            var location = "pl";
            List<Schedule> schedules = new List<Schedule>();

            foreach(var patient in patients)
            {
                var schedulenFaker = new Faker<Schedule>(location)
                .RuleFor(d => d.date, f => f.Date.Recent(120).ToString("yyyy-MM-dd"))
                .RuleFor(d => d.clock, f => f.Date.Between(DateTime.Today, DateTime.Today.AddHours(24)).ToString("HH:mm"))
                .RuleFor(d => d.status, f => f.PickRandom(new string[] {"Zaplanowana","Odwolana","Odbyta"}))
                .RuleFor(s => s.city, f => f.Address.City())
                .RuleFor(s => s.street, f => f.Address.StreetName())
                .RuleFor(s => s.streetNumber, f => f.Address.BuildingNumber())
                .RuleFor(s => s.zipCode, f => f.Address.ZipCode()) 
                .RuleFor(s => s.description, f => f.Lorem.Sentence(10)) 
                .RuleFor(d => d.patientId, f => patient.id)
                .RuleFor(d => d.childId, f => f.Random.ListItem(patient.children.ToList()).id);

                schedules.AddRange(schedulenFaker.Generate(25));
            }
            return schedules;
        }
    }
}

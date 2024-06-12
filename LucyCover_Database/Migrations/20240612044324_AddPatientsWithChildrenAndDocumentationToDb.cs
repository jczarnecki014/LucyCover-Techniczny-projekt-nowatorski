using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class AddPatientsWithChildrenAndDocumentationToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    city = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    province = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    zipCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    phoneNumber = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    birthDate = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    birthPlace = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Children",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    childFirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    childLastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    childBirthDate = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    childBirthPlace = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    patientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Children", x => x.id);
                    table.ForeignKey(
                        name: "FK_Children_Patients_patientId",
                        column: x => x.patientId,
                        principalTable: "Patients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Documentation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    First = table.Column<bool>(type: "bit", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ChildrenId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documentation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Documentation_Children_ChildrenId",
                        column: x => x.ChildrenId,
                        principalTable: "Children",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Documentation_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DocumentationFirstVisit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MotherFirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherLastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherAge = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    MotherProfesion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MotherAddress = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    BabyFirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyAge = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyBirthDay = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BabyBirthPlace = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BabyApgarScore = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    BabyBirthTime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyBirthTime_ADDITIONAL = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyBirthType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyBirthTypeReason = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BabyBirthMedicine = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DocumentationReason = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    MotherBreastfeedBefore = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    MotherBreastfeedBefore_HowLong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherBreastfeedBefore_Why = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DocumentationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentationFirstVisit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentationFirstVisit_Documentation_DocumentationId",
                        column: x => x.DocumentationId,
                        principalTable: "Documentation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentationNextVisit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientFeedingCountPerDay = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingBreastNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingHowMuchTime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingInNight = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastFeedingWithHood = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastFeedingWithHood_HowLong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastFeedingAsNeeded = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastFeedingAsNeeded_How = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingCountPerDay_DAY1 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingCountPerDay_DAY2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingCountPerDay_DAY3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingMIXCountPerDay_DAY1 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingMIXCountPerDay_DAY2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingMIXCountPerDay_DAY3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientFeedingWay = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientExpressingBreastMilk = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientExpressingBreastMilkHowManyYesterday = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastGrowingDuringPregnacy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastGrowingDuringPregnacy_DAY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientMilkRush = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastSize = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastChanges = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastChanges_WHAT = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastNipple = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastNippleAfterFeeding = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastNippleChanges = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientBreastNippleChanges_WHAT = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientMentalState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ResearchObservationBabyBehaviour = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    BabyPeeingADay = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyExcretionADay = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyColic = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyColicSinceWhen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyNipple = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyNippleSinceWhen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientMedicationsUsed = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyMedicationsUsed = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientPeriodAfterDelivery = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PatientPeriodAfterDelivery_WHEN = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PostureCorection = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SuckTraining = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BabyFatten = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OtherRecommendation = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    DocumentationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentationNextVisit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentationNextVisit_Documentation_DocumentationId",
                        column: x => x.DocumentationId,
                        principalTable: "Documentation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Children_patientId",
                table: "Children",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_Documentation_ChildrenId",
                table: "Documentation",
                column: "ChildrenId");

            migrationBuilder.CreateIndex(
                name: "IX_Documentation_PatientId",
                table: "Documentation",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentationFirstVisit_DocumentationId",
                table: "DocumentationFirstVisit",
                column: "DocumentationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DocumentationNextVisit_DocumentationId",
                table: "DocumentationNextVisit",
                column: "DocumentationId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentationFirstVisit");

            migrationBuilder.DropTable(
                name: "DocumentationNextVisit");

            migrationBuilder.DropTable(
                name: "Documentation");

            migrationBuilder.DropTable(
                name: "Children");

            migrationBuilder.DropTable(
                name: "Patients");
        }
    }
}

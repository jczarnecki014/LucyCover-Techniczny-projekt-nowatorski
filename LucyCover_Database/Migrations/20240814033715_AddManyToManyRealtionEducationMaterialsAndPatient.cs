using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class AddManyToManyRealtionEducationMaterialsAndPatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EducationMaterialsAssignedPatients",
                columns: table => new
                {
                    educationMaterialsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    patientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_EducationMaterialsAssignedPatients_EducationMaterials_educationMaterialsId",
                        column: x => x.educationMaterialsId,
                        principalTable: "EducationMaterials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EducationMaterialsAssignedPatients_Patients_patientId",
                        column: x => x.patientId,
                        principalTable: "Patients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EducationMaterialsAssignedPatients_educationMaterialsId",
                table: "EducationMaterialsAssignedPatients",
                column: "educationMaterialsId");

            migrationBuilder.CreateIndex(
                name: "IX_EducationMaterialsAssignedPatients_patientId",
                table: "EducationMaterialsAssignedPatients",
                column: "patientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EducationMaterialsAssignedPatients");
        }
    }
}

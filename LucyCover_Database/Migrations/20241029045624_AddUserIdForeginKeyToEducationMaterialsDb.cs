using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdForeginKeyToEducationMaterialsDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Children_ChildId",
                table: "Documentation");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "Documentation",
                newName: "patientId");

            migrationBuilder.RenameColumn(
                name: "First",
                table: "Documentation",
                newName: "first");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Documentation",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "ChildId",
                table: "Documentation",
                newName: "childId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Documentation",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Documentation_ChildId",
                table: "Documentation",
                newName: "IX_Documentation_childId");

            migrationBuilder.AddColumn<Guid>(
                name: "userId",
                table: "EducationMaterials",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EducationMaterials_userId",
                table: "EducationMaterials",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Documentation_patientId",
                table: "Documentation",
                column: "patientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentation_Children_childId",
                table: "Documentation",
                column: "childId",
                principalTable: "Children",
                principalColumn: "id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Documentation_Patients_patientId",
                table: "Documentation",
                column: "patientId",
                principalTable: "Patients",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationMaterials_User_userId",
                table: "EducationMaterials",
                column: "userId",
                principalTable: "User",
                principalColumn: "id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Children_childId",
                table: "Documentation");

            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Patients_patientId",
                table: "Documentation");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationMaterials_User_userId",
                table: "EducationMaterials");

            migrationBuilder.DropIndex(
                name: "IX_EducationMaterials_userId",
                table: "EducationMaterials");

            migrationBuilder.DropIndex(
                name: "IX_Documentation_patientId",
                table: "Documentation");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "EducationMaterials");

            migrationBuilder.RenameColumn(
                name: "patientId",
                table: "Documentation",
                newName: "PatientId");

            migrationBuilder.RenameColumn(
                name: "first",
                table: "Documentation",
                newName: "First");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Documentation",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "childId",
                table: "Documentation",
                newName: "ChildId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Documentation",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Documentation_childId",
                table: "Documentation",
                newName: "IX_Documentation_ChildId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentation_Children_ChildId",
                table: "Documentation",
                column: "ChildId",
                principalTable: "Children",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

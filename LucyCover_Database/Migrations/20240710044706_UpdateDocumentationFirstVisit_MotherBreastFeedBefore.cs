using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDocumentationFirstVisit_MotherBreastFeedBefore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Patients_PatientId",
                table: "Documentation");

            migrationBuilder.DropIndex(
                name: "IX_Documentation_PatientId",
                table: "Documentation");

            migrationBuilder.AlterColumn<string>(
                name: "MotherBreastfeedBefore",
                table: "DocumentationFirstVisit",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(3)",
                oldMaxLength: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MotherBreastfeedBefore",
                table: "DocumentationFirstVisit",
                type: "nvarchar(3)",
                maxLength: 3,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.CreateIndex(
                name: "IX_Documentation_PatientId",
                table: "Documentation",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentation_Patients_PatientId",
                table: "Documentation",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

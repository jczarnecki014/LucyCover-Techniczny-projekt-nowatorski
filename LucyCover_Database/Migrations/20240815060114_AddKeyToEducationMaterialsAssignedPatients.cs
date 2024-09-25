using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class AddKeyToEducationMaterialsAssignedPatients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EducationMaterialsAssignedPatients",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationMaterialsAssignedPatients",
                table: "EducationMaterialsAssignedPatients",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationMaterialsAssignedPatients",
                table: "EducationMaterialsAssignedPatients");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EducationMaterialsAssignedPatients");
        }
    }
}

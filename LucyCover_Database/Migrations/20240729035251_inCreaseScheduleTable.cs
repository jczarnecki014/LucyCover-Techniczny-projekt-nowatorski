using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class inCreaseScheduleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "Schedules",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Schedules",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "street",
                table: "Schedules",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "streetNumber",
                table: "Schedules",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "zipCode",
                table: "Schedules",
                type: "nvarchar(6)",
                maxLength: 6,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "city",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "street",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "streetNumber",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "zipCode",
                table: "Schedules");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LucyCover_Database.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameOfKolumnChildrenInDocumentationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Children_ChildrenId",
                table: "Documentation");

            migrationBuilder.RenameColumn(
                name: "ChildrenId",
                table: "Documentation",
                newName: "ChildId");

            migrationBuilder.RenameIndex(
                name: "IX_Documentation_ChildrenId",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentation_Children_ChildId",
                table: "Documentation");

            migrationBuilder.RenameColumn(
                name: "ChildId",
                table: "Documentation",
                newName: "ChildrenId");

            migrationBuilder.RenameIndex(
                name: "IX_Documentation_ChildId",
                table: "Documentation",
                newName: "IX_Documentation_ChildrenId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentation_Children_ChildrenId",
                table: "Documentation",
                column: "ChildrenId",
                principalTable: "Children",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

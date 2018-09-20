using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class f : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "AppReglements",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Montant",
                table: "AppFactures",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Montant",
                table: "AppFactures");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "AppReglements",
                newName: "id");
        }
    }
}

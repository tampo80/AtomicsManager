using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class next2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Accompte",
                table: "AppBonDeCommande",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Penalite",
                table: "AppBonDeCommande",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accompte",
                table: "AppBonDeCommande");

            migrationBuilder.DropColumn(
                name: "Penalite",
                table: "AppBonDeCommande");
        }
    }
}

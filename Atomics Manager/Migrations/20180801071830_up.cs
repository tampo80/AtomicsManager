using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class up : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantite",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantite",
                table: "AppDemandes");
        }
    }
}

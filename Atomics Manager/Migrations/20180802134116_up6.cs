using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class up6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Shared",
                table: "AppApprobationLevel",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Shared",
                table: "AppApprobationLevel");
        }
    }
}

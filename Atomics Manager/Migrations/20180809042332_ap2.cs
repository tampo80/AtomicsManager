using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class ap2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EpertsId",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EpertsId",
                table: "AppDemandes");
        }
    }
}

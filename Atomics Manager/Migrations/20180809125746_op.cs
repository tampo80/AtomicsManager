using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class op : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EpertsId",
                table: "AppDemandes",
                newName: "ExpertsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExpertsId",
                table: "AppDemandes",
                newName: "EpertsId");
        }
    }
}

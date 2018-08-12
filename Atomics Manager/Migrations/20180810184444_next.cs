using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class next : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ValitationRequieredNumber",
                table: "AppApprobationWorkflow",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActvie",
                table: "AppApprobationLevel",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnded",
                table: "AppApprobationLevel",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "NumberApprovalRequiered",
                table: "AppApprobationLevel",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValitationRequieredNumber",
                table: "AppApprobationWorkflow");

            migrationBuilder.DropColumn(
                name: "IsActvie",
                table: "AppApprobationLevel");

            migrationBuilder.DropColumn(
                name: "IsEnded",
                table: "AppApprobationLevel");

            migrationBuilder.DropColumn(
                name: "NumberApprovalRequiered",
                table: "AppApprobationLevel");
        }
    }
}

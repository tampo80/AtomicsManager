using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class oks1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "CurrentStartId",
                table: "AppDemandes");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentStatId",
                table: "AppDemandes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes",
                column: "CurrentStatId",
                principalTable: "WorkEtats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentStatId",
                table: "AppDemandes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "CurrentStartId",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes",
                column: "CurrentStatId",
                principalTable: "WorkEtats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

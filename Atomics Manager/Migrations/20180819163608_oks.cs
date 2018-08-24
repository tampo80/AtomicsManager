using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class oks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStartId",
                table: "AppDemandes");

            migrationBuilder.DropIndex(
                name: "IX_AppDemandes_CurrentStartId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "ExpertsId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "Statut",
                table: "AppDemandes");

            migrationBuilder.AddColumn<int>(
                name: "CurrentStatId",
                table: "AppDemandes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_CurrentStatId",
                table: "AppDemandes",
                column: "CurrentStatId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes",
                column: "CurrentStatId",
                principalTable: "WorkEtats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                table: "AppDemandes");

            migrationBuilder.DropIndex(
                name: "IX_AppDemandes_CurrentStatId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "CurrentStatId",
                table: "AppDemandes");

            migrationBuilder.AddColumn<int>(
                name: "ExpertsId",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Statut",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_CurrentStartId",
                table: "AppDemandes",
                column: "CurrentStartId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStartId",
                table: "AppDemandes",
                column: "CurrentStartId",
                principalTable: "WorkEtats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

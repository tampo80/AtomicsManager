using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class oks1234 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DemandesId",
                table: "AppActionsHistories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_DemandesId",
                table: "AppActionsHistories",
                column: "DemandesId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppActionsHistories_AppDemandes_DemandesId",
                table: "AppActionsHistories",
                column: "DemandesId",
                principalTable: "AppDemandes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppActionsHistories_AppDemandes_DemandesId",
                table: "AppActionsHistories");

            migrationBuilder.DropIndex(
                name: "IX_AppActionsHistories_DemandesId",
                table: "AppActionsHistories");

            migrationBuilder.DropColumn(
                name: "DemandesId",
                table: "AppActionsHistories");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class k : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "WorkGroup",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentStartId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkEtats_CurrentStartId",
                table: "AppDemandes");

            migrationBuilder.DropIndex(
                name: "IX_AppDemandes_CurrentStartId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "WorkGroup");

            migrationBuilder.DropColumn(
                name: "CurrentStartId",
                table: "AppDemandes");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class next1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppBonDeCommande_AppDemandes_DemandesId",
                table: "AppBonDeCommande");

            migrationBuilder.DropColumn(
                name: "DemandeId",
                table: "AppBonDeCommande");

            migrationBuilder.AlterColumn<int>(
                name: "DemandesId",
                table: "AppBonDeCommande",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppBonDeCommande_AppDemandes_DemandesId",
                table: "AppBonDeCommande",
                column: "DemandesId",
                principalTable: "AppDemandes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppBonDeCommande_AppDemandes_DemandesId",
                table: "AppBonDeCommande");

            migrationBuilder.AlterColumn<int>(
                name: "DemandesId",
                table: "AppBonDeCommande",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "DemandeId",
                table: "AppBonDeCommande",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_AppBonDeCommande_AppDemandes_DemandesId",
                table: "AppBonDeCommande",
                column: "DemandesId",
                principalTable: "AppDemandes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

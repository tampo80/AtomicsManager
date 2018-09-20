using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class o : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFactures_AppDemandes_DemandesId",
                table: "AppFactures");

            migrationBuilder.DropColumn(
                name: "DemandeId",
                table: "AppFactures");

            migrationBuilder.AlterColumn<int>(
                name: "DemandesId",
                table: "AppFactures",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppFactures_AppDemandes_DemandesId",
                table: "AppFactures",
                column: "DemandesId",
                principalTable: "AppDemandes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFactures_AppDemandes_DemandesId",
                table: "AppFactures");

            migrationBuilder.AlterColumn<int>(
                name: "DemandesId",
                table: "AppFactures",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "DemandeId",
                table: "AppFactures",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_AppFactures_AppDemandes_DemandesId",
                table: "AppFactures",
                column: "DemandesId",
                principalTable: "AppDemandes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class ap : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes");

            migrationBuilder.AlterColumn<int>(
                name: "FournisseursId",
                table: "AppDemandes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_ProductId",
                table: "AppDemandes",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes",
                column: "FournisseursId",
                principalTable: "AppFournisseurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_AppProducts_ProductId",
                table: "AppDemandes",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_AppProducts_ProductId",
                table: "AppDemandes");

            migrationBuilder.DropIndex(
                name: "IX_AppDemandes_ProductId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "AppDemandes");

            migrationBuilder.AlterColumn<int>(
                name: "FournisseursId",
                table: "AppDemandes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes",
                column: "FournisseursId",
                principalTable: "AppFournisseurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

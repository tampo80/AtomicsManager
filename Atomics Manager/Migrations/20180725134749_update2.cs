using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demandes_AppFournisseurs_FournisseursId",
                table: "Demandes");

            migrationBuilder.DropForeignKey(
                name: "FK_Demandes_AspNetUsers_userId",
                table: "Demandes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes");

            migrationBuilder.RenameTable(
                name: "Demandes",
                newName: "AppDemandes");

            migrationBuilder.RenameIndex(
                name: "IX_Demandes_userId",
                table: "AppDemandes",
                newName: "IX_AppDemandes_userId");

            migrationBuilder.RenameIndex(
                name: "IX_Demandes_FournisseursId",
                table: "AppDemandes",
                newName: "IX_AppDemandes_FournisseursId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppDemandes",
                table: "AppDemandes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes",
                column: "FournisseursId",
                principalTable: "AppFournisseurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_AspNetUsers_userId",
                table: "AppDemandes",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                table: "AppDemandes");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_AspNetUsers_userId",
                table: "AppDemandes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppDemandes",
                table: "AppDemandes");

            migrationBuilder.RenameTable(
                name: "AppDemandes",
                newName: "Demandes");

            migrationBuilder.RenameIndex(
                name: "IX_AppDemandes_userId",
                table: "Demandes",
                newName: "IX_Demandes_userId");

            migrationBuilder.RenameIndex(
                name: "IX_AppDemandes_FournisseursId",
                table: "Demandes",
                newName: "IX_Demandes_FournisseursId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Demandes_AppFournisseurs_FournisseursId",
                table: "Demandes",
                column: "FournisseursId",
                principalTable: "AppFournisseurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Demandes_AspNetUsers_userId",
                table: "Demandes",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

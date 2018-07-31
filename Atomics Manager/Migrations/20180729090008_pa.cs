using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class pa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppAgences_AgencesId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.DropIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.AlterColumn<int>(
                name: "AgencesId",
                table: "AppEntrepriseUserInfos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos",
                column: "DepartementsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppAgences_AgencesId",
                table: "AppEntrepriseUserInfos",
                column: "AgencesId",
                principalTable: "AppAgences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppAgences_AgencesId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.DropIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.AlterColumn<int>(
                name: "AgencesId",
                table: "AppEntrepriseUserInfos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos",
                column: "DepartementsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppAgences_AgencesId",
                table: "AppEntrepriseUserInfos",
                column: "AgencesId",
                principalTable: "AppAgences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDepartements_AppEntrepriseUserInfos_HeadId",
                table: "AppDepartements");

            migrationBuilder.DropIndex(
                name: "IX_AppDepartements_HeadId",
                table: "AppDepartements");

            migrationBuilder.DropColumn(
                name: "HeadId",
                table: "AppDepartements");

            migrationBuilder.AddColumn<int>(
                name: "DepartementsId",
                table: "AppEntrepriseUserInfos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos",
                column: "DepartementsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppDepartements_DepartementsId",
                table: "AppEntrepriseUserInfos",
                column: "DepartementsId",
                principalTable: "AppDepartements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntrepriseUserInfos_AppDepartements_DepartementsId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.DropIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.DropColumn(
                name: "DepartementsId",
                table: "AppEntrepriseUserInfos");

            migrationBuilder.AddColumn<int>(
                name: "HeadId",
                table: "AppDepartements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppDepartements_HeadId",
                table: "AppDepartements",
                column: "HeadId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDepartements_AppEntrepriseUserInfos_HeadId",
                table: "AppDepartements",
                column: "HeadId",
                principalTable: "AppEntrepriseUserInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

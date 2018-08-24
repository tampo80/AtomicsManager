using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class ok1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkActionTarget_WorkGroup_GroupId",
                table: "WorkActionTarget");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkActiviteTargets_WorkGroup_GroupId",
                table: "WorkActiviteTargets");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "WorkActiviteTargets",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "WorkActionTarget",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_WorkActionTarget_WorkGroup_GroupId",
                table: "WorkActionTarget",
                column: "GroupId",
                principalTable: "WorkGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkActiviteTargets_WorkGroup_GroupId",
                table: "WorkActiviteTargets",
                column: "GroupId",
                principalTable: "WorkGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkActionTarget_WorkGroup_GroupId",
                table: "WorkActionTarget");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkActiviteTargets_WorkGroup_GroupId",
                table: "WorkActiviteTargets");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "WorkActiviteTargets",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "WorkActionTarget",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkActionTarget_WorkGroup_GroupId",
                table: "WorkActionTarget",
                column: "GroupId",
                principalTable: "WorkGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkActiviteTargets_WorkGroup_GroupId",
                table: "WorkActiviteTargets",
                column: "GroupId",
                principalTable: "WorkGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

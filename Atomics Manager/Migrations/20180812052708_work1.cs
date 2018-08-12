using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class work1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkDemandesAction_WorkTransition_TransitionId",
                table: "WorkDemandesAction");

            migrationBuilder.DropColumn(
                name: "TrasitionId",
                table: "WorkDemandesAction");

            migrationBuilder.AlterColumn<int>(
                name: "TransitionId",
                table: "WorkDemandesAction",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkDemandesAction_WorkTransition_TransitionId",
                table: "WorkDemandesAction",
                column: "TransitionId",
                principalTable: "WorkTransition",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkDemandesAction_WorkTransition_TransitionId",
                table: "WorkDemandesAction");

            migrationBuilder.AlterColumn<int>(
                name: "TransitionId",
                table: "WorkDemandesAction",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "TrasitionId",
                table: "WorkDemandesAction",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkDemandesAction_WorkTransition_TransitionId",
                table: "WorkDemandesAction",
                column: "TransitionId",
                principalTable: "WorkTransition",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

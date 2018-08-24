using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class ok : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkTransitionActivite",
                columns: table => new
                {
                    ActiviteId = table.Column<int>(nullable: false),
                    TransitionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTransitionActivite", x => new { x.ActiviteId, x.TransitionId });
                    table.ForeignKey(
                        name: "FK_WorkTransitionActivite_WorkActivite_ActiviteId",
                        column: x => x.ActiviteId,
                        principalTable: "WorkActivite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkTransitionActivite_WorkTransition_TransitionId",
                        column: x => x.TransitionId,
                        principalTable: "WorkTransition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransitionActivite_TransitionId",
                table: "WorkTransitionActivite",
                column: "TransitionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkTransitionActivite");
        }
    }
}

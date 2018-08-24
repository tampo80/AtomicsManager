using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class oks123 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppActionsHistories",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<string>(nullable: true),
                    ActionsId = table.Column<int>(nullable: false),
                    EtatId = table.Column<int>(nullable: false),
                    dateOperation = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppActionsHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppActionsHistories_WorkActions_ActionsId",
                        column: x => x.ActionsId,
                        principalTable: "WorkActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppActionsHistories_WorkEtats_EtatId",
                        column: x => x.EtatId,
                        principalTable: "WorkEtats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppActionsHistories_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_ActionsId",
                table: "AppActionsHistories",
                column: "ActionsId");

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_EtatId",
                table: "AppActionsHistories",
                column: "EtatId");

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_UserId",
                table: "AppActionsHistories",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppActionsHistories");
        }
    }
}

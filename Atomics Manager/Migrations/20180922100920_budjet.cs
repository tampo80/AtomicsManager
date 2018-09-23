using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class budjet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppBudjetAgences",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Annees = table.Column<DateTime>(nullable: false),
                    LigneCapex = table.Column<double>(nullable: false),
                    LigneOpex = table.Column<double>(nullable: false),
                    BudjetOpex = table.Column<double>(nullable: false),
                    BudjetCapex = table.Column<double>(nullable: false),
                    AgencesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBudjetAgences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBudjetAgences_AppAgences_AgencesId",
                        column: x => x.AgencesId,
                        principalTable: "AppAgences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppBudjetDepartements",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Annees = table.Column<DateTime>(nullable: false),
                    LigneCapex = table.Column<double>(nullable: false),
                    LigneOpex = table.Column<double>(nullable: false),
                    BudjetOpex = table.Column<double>(nullable: false),
                    BudjetCapex = table.Column<double>(nullable: false),
                    DepartementsId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBudjetDepartements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBudjetDepartements_AppDepartements_DepartementsId",
                        column: x => x.DepartementsId,
                        principalTable: "AppDepartements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppBudjetEntreprises",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Annees = table.Column<DateTime>(nullable: false),
                    LigneCapex = table.Column<double>(nullable: false),
                    LigneOpex = table.Column<double>(nullable: false),
                    BudjetOpex = table.Column<double>(nullable: false),
                    BudjetCapex = table.Column<double>(nullable: false),
                    EntrepriseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBudjetEntreprises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBudjetEntreprises_AppEntreprise_EntrepriseId",
                        column: x => x.EntrepriseId,
                        principalTable: "AppEntreprise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppBudjetServices",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Annees = table.Column<DateTime>(nullable: false),
                    LigneCapex = table.Column<double>(nullable: false),
                    LigneOpex = table.Column<double>(nullable: false),
                    BudjetOpex = table.Column<double>(nullable: false),
                    BudjetCapex = table.Column<double>(nullable: false),
                    ServicesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBudjetServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBudjetServices_AppServices_ServicesId",
                        column: x => x.ServicesId,
                        principalTable: "AppServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppBudjetAgences_AgencesId",
                table: "AppBudjetAgences",
                column: "AgencesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBudjetDepartements_DepartementsId",
                table: "AppBudjetDepartements",
                column: "DepartementsId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBudjetEntreprises_EntrepriseId",
                table: "AppBudjetEntreprises",
                column: "EntrepriseId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBudjetServices_ServicesId",
                table: "AppBudjetServices",
                column: "ServicesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppBudjetAgences");

            migrationBuilder.DropTable(
                name: "AppBudjetDepartements");

            migrationBuilder.DropTable(
                name: "AppBudjetEntreprises");

            migrationBuilder.DropTable(
                name: "AppBudjetServices");
        }
    }
}

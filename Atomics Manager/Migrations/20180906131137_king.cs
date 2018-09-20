using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class king : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppFactures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ComptesInternesId = table.Column<int>(nullable: false),
                    DemandesId = table.Column<int>(nullable: true),
                    DemandeId = table.Column<int>(nullable: false),
                    DateOperation = table.Column<DateTime>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Libele = table.Column<string>(nullable: true),
                    TvaDeductible = table.Column<bool>(nullable: false),
                    FraitsTransports = table.Column<string>(nullable: true),
                    Ristoune = table.Column<string>(nullable: true),
                    TauxTva = table.Column<int>(nullable: false),
                    tva = table.Column<string>(nullable: true),
                    EtatFacture = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppFactures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppFactures_AppComptesInternes_ComptesInternesId",
                        column: x => x.ComptesInternesId,
                        principalTable: "AppComptesInternes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppFactures_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppReglements",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    FacturesId = table.Column<int>(nullable: false),
                    DateOperation = table.Column<DateTime>(nullable: false),
                    MontantRestant = table.Column<double>(nullable: false),
                    MontantPaye = table.Column<double>(nullable: false),
                    MyPropMethodePayementerty = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppReglements", x => x.id);
                    table.ForeignKey(
                        name: "FK_AppReglements_AppFactures_FacturesId",
                        column: x => x.FacturesId,
                        principalTable: "AppFactures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppFactures_ComptesInternesId",
                table: "AppFactures",
                column: "ComptesInternesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppFactures_DemandesId",
                table: "AppFactures",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppReglements_FacturesId",
                table: "AppReglements",
                column: "FacturesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppReglements");

            migrationBuilder.DropTable(
                name: "AppFactures");
        }
    }
}

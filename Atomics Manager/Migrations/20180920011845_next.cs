using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class next : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "AppReglements",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "AppReglements",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "AppReglements",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "AppReglements",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AppBonDeCommande",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DateOperation = table.Column<DateTime>(nullable: false),
                    RefBon = table.Column<string>(nullable: true),
                    DemandeId = table.Column<int>(nullable: false),
                    DemandesId = table.Column<int>(nullable: true),
                    Montant = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBonDeCommande", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBonDeCommande_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppBonLivraison",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    RefBL = table.Column<string>(nullable: true),
                    DemandesId = table.Column<int>(nullable: false),
                    Livreure = table.Column<string>(nullable: true),
                    DateLivraison = table.Column<DateTime>(nullable: false),
                    IsInSla = table.Column<bool>(nullable: false),
                    Control = table.Column<bool>(nullable: false),
                    ControleurId = table.Column<string>(nullable: true),
                    MatchToBon = table.Column<bool>(nullable: false),
                    Commentaire = table.Column<string>(nullable: true),
                    NoteFournisseur = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBonLivraison", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBonLivraison_AspNetUsers_ControleurId",
                        column: x => x.ControleurId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppBonLivraison_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppBonDeCommande_DemandesId",
                table: "AppBonDeCommande",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBonLivraison_ControleurId",
                table: "AppBonLivraison",
                column: "ControleurId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBonLivraison_DemandesId",
                table: "AppBonLivraison",
                column: "DemandesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppBonDeCommande");

            migrationBuilder.DropTable(
                name: "AppBonLivraison");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "AppReglements");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "AppReglements");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "AppReglements");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "AppReglements");
        }
    }
}

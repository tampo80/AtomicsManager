using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class createIni : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppEntreprise",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    titre = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    webSite = table.Column<string>(nullable: true),
                    Tel = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    Logo = table.Column<byte[]>(nullable: true),
                    FormeJuridique = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppEntreprise", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppEntreprise");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class ok : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppTypeComptes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    NatureCompte = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTypeComptes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppComptesInternes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    NumCompte = table.Column<string>(nullable: true),
                    Label = table.Column<string>(nullable: true),
                    TypeComptesId = table.Column<int>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppComptesInternes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppComptesInternes_AppTypeComptes_TypeComptesId",
                        column: x => x.TypeComptesId,
                        principalTable: "AppTypeComptes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppComptesInternes_TypeComptesId",
                table: "AppComptesInternes",
                column: "TypeComptesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppComptesInternes");

            migrationBuilder.DropTable(
                name: "AppTypeComptes");
        }
    }
}

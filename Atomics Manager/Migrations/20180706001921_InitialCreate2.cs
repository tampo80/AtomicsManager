using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Atomics_Manager.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AppDemandes",
                table: "AppDemandes");

            migrationBuilder.RenameTable(
                name: "AppDemandes",
                newName: "Demandes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AppDevises",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Symbole = table.Column<string>(nullable: true),
                    Label = table.Column<string>(nullable: true),
                    CodeIso = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDevises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppPays",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    CodePays = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppSecteurs",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSecteurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppVilles",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    PaysId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppVilles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppVilles_AppPays_PaysId",
                        column: x => x.PaysId,
                        principalTable: "AppPays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppBankInfos",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BankName = table.Column<string>(nullable: true),
                    AccountNumber = table.Column<string>(nullable: true),
                    AccountName = table.Column<string>(nullable: true),
                    Adrresse = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    TelephoneNumbers = table.Column<string>(nullable: true),
                    VillesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBankInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBankInfos_AppVilles_VillesId",
                        column: x => x.VillesId,
                        principalTable: "AppVilles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppFournisseurs",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Titre = table.Column<int>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    AlternatePhoneNumber = table.Column<string>(nullable: true),
                    CodePostale = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    DevisesPayementId = table.Column<int>(nullable: true),
                    TypePayments = table.Column<int>(nullable: false),
                    NumeroDeCompte = table.Column<string>(nullable: true),
                    IntituleDuCompte = table.Column<string>(nullable: true),
                    BankInfosId = table.Column<int>(nullable: true),
                    VilleId = table.Column<int>(nullable: false),
                    VillesId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppFournisseurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppFournisseurs_AppBankInfos_BankInfosId",
                        column: x => x.BankInfosId,
                        principalTable: "AppBankInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppFournisseurs_AppDevises_DevisesPayementId",
                        column: x => x.DevisesPayementId,
                        principalTable: "AppDevises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppFournisseurs_AppVilles_VillesId",
                        column: x => x.VillesId,
                        principalTable: "AppVilles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SecteursFournisseurs",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FournisseursId = table.Column<int>(nullable: true),
                    SecteursId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecteursFournisseurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SecteursFournisseurs_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SecteursFournisseurs_AppSecteurs_SecteursId",
                        column: x => x.SecteursId,
                        principalTable: "AppSecteurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppBankInfos_BankName",
                table: "AppBankInfos",
                column: "BankName");

            migrationBuilder.CreateIndex(
                name: "IX_AppBankInfos_VillesId",
                table: "AppBankInfos",
                column: "VillesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDevises_Label",
                table: "AppDevises",
                column: "Label");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_BankInfosId",
                table: "AppFournisseurs",
                column: "BankInfosId");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_DevisesPayementId",
                table: "AppFournisseurs",
                column: "DevisesPayementId");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_Titre",
                table: "AppFournisseurs",
                column: "Titre");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_VillesId",
                table: "AppFournisseurs",
                column: "VillesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPays_Name",
                table: "AppPays",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppSecteurs_Name",
                table: "AppSecteurs",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppVilles_Name",
                table: "AppVilles",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppVilles_PaysId",
                table: "AppVilles",
                column: "PaysId");

            migrationBuilder.CreateIndex(
                name: "IX_SecteursFournisseurs_FournisseursId",
                table: "SecteursFournisseurs",
                column: "FournisseursId");

            migrationBuilder.CreateIndex(
                name: "IX_SecteursFournisseurs_SecteursId",
                table: "SecteursFournisseurs",
                column: "SecteursId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SecteursFournisseurs");

            migrationBuilder.DropTable(
                name: "AppFournisseurs");

            migrationBuilder.DropTable(
                name: "AppSecteurs");

            migrationBuilder.DropTable(
                name: "AppBankInfos");

            migrationBuilder.DropTable(
                name: "AppDevises");

            migrationBuilder.DropTable(
                name: "AppVilles");

            migrationBuilder.DropTable(
                name: "AppPays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes");

            migrationBuilder.RenameTable(
                name: "Demandes",
                newName: "AppDemandes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppDemandes",
                table: "AppDemandes",
                column: "Id");
        }
    }
}

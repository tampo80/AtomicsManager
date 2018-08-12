using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class work : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProcessId",
                table: "AppDemandes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WorkFichierDemandes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DemandesId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    DateEnvoi = table.Column<DateTime>(nullable: false),
                    NomFichier = table.Column<string>(nullable: true),
                    Fichier = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkFichierDemandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkFichierDemandes_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkFichierDemandes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkInfosDemandes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DemandesId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkInfosDemandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkInfosDemandes_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkInfosDemandes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkProcess",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkProcess", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkStakeholders",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    DemandesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkStakeholders", x => new { x.DemandesId, x.UserId });
                    table.ForeignKey(
                        name: "FK_WorkStakeholders_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkStakeholders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkActions",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    TypeAction = table.Column<int>(nullable: false),
                    ProcessId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Descriprion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkActions_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkActivite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProcessId = table.Column<int>(nullable: false),
                    TypeActivite = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Descriptions = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActivite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkActivite_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkEtats",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    TypeEtats = table.Column<int>(nullable: false),
                    ProcessId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkEtats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkEtats_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProcessId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkGroup_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkProcessAdmins",
                columns: table => new
                {
                    ProcessId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkProcessAdmins", x => new { x.ProcessId, x.UserId });
                    table.ForeignKey(
                        name: "FK_WorkProcessAdmins_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkProcessAdmins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkEtatActivite",
                columns: table => new
                {
                    EtatId = table.Column<int>(nullable: false),
                    ActiviteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkEtatActivite", x => new { x.ActiviteId, x.EtatId });
                    table.ForeignKey(
                        name: "FK_WorkEtatActivite_WorkActivite_ActiviteId",
                        column: x => x.ActiviteId,
                        principalTable: "WorkActivite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkEtatActivite_WorkEtats_EtatId",
                        column: x => x.EtatId,
                        principalTable: "WorkEtats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkTransition",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProcessId = table.Column<int>(nullable: false),
                    EtatActuelId = table.Column<int>(nullable: false),
                    EtatSuivantId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTransition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkTransition_WorkEtats_EtatActuelId",
                        column: x => x.EtatActuelId,
                        principalTable: "WorkEtats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkTransition_WorkEtats_EtatSuivantId",
                        column: x => x.EtatSuivantId,
                        principalTable: "WorkEtats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkTransition_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkActionTarget",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ActionsId = table.Column<int>(nullable: false),
                    Target = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActionTarget", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkActionTarget_WorkActions_ActionsId",
                        column: x => x.ActionsId,
                        principalTable: "WorkActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkActionTarget_WorkGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "WorkGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkActiviteTargets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ActiviteId = table.Column<int>(nullable: false),
                    Target = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActiviteTargets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkActiviteTargets_WorkActivite_ActiviteId",
                        column: x => x.ActiviteId,
                        principalTable: "WorkActivite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkActiviteTargets_WorkGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "WorkGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkGroupeMember",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkGroupeMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkGroupeMember_WorkGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "WorkGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkGroupeMember_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkDemandesAction",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DemandesId = table.Column<int>(nullable: false),
                    ActionsId = table.Column<int>(nullable: false),
                    TrasitionId = table.Column<int>(nullable: false),
                    TransitionId = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsComplete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkDemandesAction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkDemandesAction_WorkActions_ActionsId",
                        column: x => x.ActionsId,
                        principalTable: "WorkActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkDemandesAction_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkDemandesAction_WorkTransition_TransitionId",
                        column: x => x.TransitionId,
                        principalTable: "WorkTransition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkTransitionActions",
                columns: table => new
                {
                    ActionsId = table.Column<int>(nullable: false),
                    TransitionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTransitionActions", x => new { x.ActionsId, x.TransitionId });
                    table.ForeignKey(
                        name: "FK_WorkTransitionActions_WorkActions_ActionsId",
                        column: x => x.ActionsId,
                        principalTable: "WorkActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkTransitionActions_WorkTransition_TransitionId",
                        column: x => x.TransitionId,
                        principalTable: "WorkTransition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_ProcessId",
                table: "AppDemandes",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActions_ProcessId",
                table: "WorkActions",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActionTarget_ActionsId",
                table: "WorkActionTarget",
                column: "ActionsId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActionTarget_GroupId",
                table: "WorkActionTarget",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActivite_ProcessId",
                table: "WorkActivite",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActiviteTargets_ActiviteId",
                table: "WorkActiviteTargets",
                column: "ActiviteId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActiviteTargets_GroupId",
                table: "WorkActiviteTargets",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkDemandesAction_ActionsId",
                table: "WorkDemandesAction",
                column: "ActionsId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkDemandesAction_DemandesId",
                table: "WorkDemandesAction",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkDemandesAction_TransitionId",
                table: "WorkDemandesAction",
                column: "TransitionId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkEtatActivite_EtatId",
                table: "WorkEtatActivite",
                column: "EtatId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkEtats_ProcessId",
                table: "WorkEtats",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkFichierDemandes_DemandesId",
                table: "WorkFichierDemandes",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkFichierDemandes_UserId",
                table: "WorkFichierDemandes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkGroup_ProcessId",
                table: "WorkGroup",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkGroupeMember_GroupId",
                table: "WorkGroupeMember",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkGroupeMember_UserId",
                table: "WorkGroupeMember",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkInfosDemandes_DemandesId",
                table: "WorkInfosDemandes",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkInfosDemandes_UserId",
                table: "WorkInfosDemandes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkProcessAdmins_UserId",
                table: "WorkProcessAdmins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkStakeholders_UserId",
                table: "WorkStakeholders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransition_EtatActuelId",
                table: "WorkTransition",
                column: "EtatActuelId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransition_EtatSuivantId",
                table: "WorkTransition",
                column: "EtatSuivantId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransition_ProcessId",
                table: "WorkTransition",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransitionActions_TransitionId",
                table: "WorkTransitionActions",
                column: "TransitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDemandes_WorkProcess_ProcessId",
                table: "AppDemandes",
                column: "ProcessId",
                principalTable: "WorkProcess",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDemandes_WorkProcess_ProcessId",
                table: "AppDemandes");

            migrationBuilder.DropTable(
                name: "WorkActionTarget");

            migrationBuilder.DropTable(
                name: "WorkActiviteTargets");

            migrationBuilder.DropTable(
                name: "WorkDemandesAction");

            migrationBuilder.DropTable(
                name: "WorkEtatActivite");

            migrationBuilder.DropTable(
                name: "WorkFichierDemandes");

            migrationBuilder.DropTable(
                name: "WorkGroupeMember");

            migrationBuilder.DropTable(
                name: "WorkInfosDemandes");

            migrationBuilder.DropTable(
                name: "WorkProcessAdmins");

            migrationBuilder.DropTable(
                name: "WorkStakeholders");

            migrationBuilder.DropTable(
                name: "WorkTransitionActions");

            migrationBuilder.DropTable(
                name: "WorkActivite");

            migrationBuilder.DropTable(
                name: "WorkGroup");

            migrationBuilder.DropTable(
                name: "WorkActions");

            migrationBuilder.DropTable(
                name: "WorkTransition");

            migrationBuilder.DropTable(
                name: "WorkEtats");

            migrationBuilder.DropTable(
                name: "WorkProcess");

            migrationBuilder.DropIndex(
                name: "IX_AppDemandes_ProcessId",
                table: "AppDemandes");

            migrationBuilder.DropColumn(
                name: "ProcessId",
                table: "AppDemandes");
        }
    }
}

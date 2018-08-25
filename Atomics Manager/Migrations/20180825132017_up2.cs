using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AtomicsManager.Migrations
{
    public partial class up2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppApprobationLevel",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    ExpensLimite = table.Column<decimal>(nullable: false),
                    TypeApprovalGroup = table.Column<int>(nullable: false),
                    NumberApprovalRequiered = table.Column<int>(nullable: false),
                    IsActvie = table.Column<bool>(nullable: false),
                    IsEnded = table.Column<bool>(nullable: false),
                    Shared = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppApprobationLevel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppCustomers",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    PhoneNumber = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    Address = table.Column<string>(nullable: true),
                    City = table.Column<string>(maxLength: 50, nullable: true),
                    Gender = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCustomers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppDepartements",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDepartements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppDevises",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Symbole = table.Column<string>(nullable: true),
                    Label = table.Column<string>(nullable: true),
                    CodeIso = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDevises", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "AppPays",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    CodePays = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppProductCategories",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    Icon = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppProductCategories", x => x.Id);
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
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSecteurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    JobTitle = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Configuration = table.Column<string>(nullable: true),
                    IsEnabled = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictApplications",
                columns: table => new
                {
                    ClientId = table.Column<string>(nullable: false),
                    ClientSecret = table.Column<string>(nullable: true),
                    ConcurrencyToken = table.Column<string>(nullable: true),
                    ConsentType = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Permissions = table.Column<string>(nullable: true),
                    PostLogoutRedirectUris = table.Column<string>(nullable: true),
                    Properties = table.Column<string>(nullable: true),
                    RedirectUris = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictApplications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictScopes",
                columns: table => new
                {
                    ConcurrencyToken = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Properties = table.Column<string>(nullable: true),
                    Resources = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictScopes", x => x.Id);
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
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkProcess", x => x.Id);
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
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
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
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppAPGmembers",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    MemberId = table.Column<string>(nullable: true),
                    ApprobationLevelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAPGmembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAPGmembers_AppApprobationLevel_ApprobationLevelId",
                        column: x => x.ApprobationLevelId,
                        principalTable: "AppApprobationLevel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppAPGmembers_AspNetUsers_MemberId",
                        column: x => x.MemberId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppOrders",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Discount = table.Column<decimal>(nullable: false),
                    Comments = table.Column<string>(maxLength: 500, nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    CashierId = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppOrders_AspNetUsers_CashierId",
                        column: x => x.CashierId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppOrders_AppCustomers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "AppCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppServices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    HeadId = table.Column<string>(nullable: true),
                    DepartementsId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppServices_AppDepartements_DepartementsId",
                        column: x => x.DepartementsId,
                        principalTable: "AppDepartements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppServices_AspNetUsers_HeadId",
                        column: x => x.HeadId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictAuthorizations",
                columns: table => new
                {
                    ApplicationId = table.Column<string>(nullable: true),
                    ConcurrencyToken = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Properties = table.Column<string>(nullable: true),
                    Scopes = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: false),
                    Subject = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictAuthorizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictAuthorizations_OpenIddictApplications_Application~",
                        column: x => x.ApplicationId,
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    Description = table.Column<string>(nullable: true)
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
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
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
                name: "AppAgences",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    HeadName = table.Column<string>(nullable: true),
                    IsMain = table.Column<bool>(nullable: false),
                    Tel = table.Column<string>(nullable: true),
                    VillesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAgences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAgences_AppVilles_VillesId",
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
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Titre = table.Column<string>(nullable: true),
                    FormeJuridique = table.Column<string>(nullable: true),
                    NomSociete = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    NumTVAintracommunautare = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Emailcommande = table.Column<string>(nullable: true),
                    TelCommande = table.Column<string>(nullable: true),
                    AlternatePhoneNumber = table.Column<string>(nullable: true),
                    CodePostale = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    NomDg = table.Column<string>(nullable: true),
                    TelDg = table.Column<string>(nullable: true),
                    TypePayments = table.Column<int>(nullable: false),
                    DevisesId = table.Column<int>(nullable: true),
                    VillesId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppFournisseurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppFournisseurs_AppDevises_DevisesId",
                        column: x => x.DevisesId,
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
                name: "OpenIddictTokens",
                columns: table => new
                {
                    ApplicationId = table.Column<string>(nullable: true),
                    AuthorizationId = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTimeOffset>(nullable: true),
                    ExpirationDate = table.Column<DateTimeOffset>(nullable: true),
                    ConcurrencyToken = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Payload = table.Column<string>(nullable: true),
                    Properties = table.Column<string>(nullable: true),
                    ReferenceId = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Subject = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictApplications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictAuthorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalTable: "OpenIddictAuthorizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    GroupId = table.Column<int>(nullable: true)
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
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkActiviteTargets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ActiviteId = table.Column<int>(nullable: false),
                    Target = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: true)
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
                        onDelete: ReferentialAction.Restrict);
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
                name: "AppEntrepriseUserInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencesId = table.Column<int>(nullable: false),
                    DepartementsId = table.Column<int>(nullable: false),
                    ServicesId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppEntrepriseUserInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppEntrepriseUserInfos_AppAgences_AgencesId",
                        column: x => x.AgencesId,
                        principalTable: "AppAgences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppEntrepriseUserInfos_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppEntrepriseUserInfos_AppDepartements_DepartementsId",
                        column: x => x.DepartementsId,
                        principalTable: "AppDepartements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppEntrepriseUserInfos_AppServices_ServicesId",
                        column: x => x.ServicesId,
                        principalTable: "AppServices",
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
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    BankName = table.Column<string>(nullable: true),
                    AccountNumber = table.Column<string>(nullable: true),
                    AccountName = table.Column<string>(nullable: true),
                    IBAN = table.Column<string>(nullable: true),
                    Adrresse = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    TelephoneNumbers = table.Column<string>(nullable: true),
                    VillesId = table.Column<int>(nullable: true),
                    FournisseursId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBankInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBankInfos_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppBankInfos_AppVilles_VillesId",
                        column: x => x.VillesId,
                        principalTable: "AppVilles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppDocumentsFournisseurs",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DocumentName = table.Column<string>(nullable: true),
                    Documents = table.Column<byte[]>(nullable: true),
                    typeDocFournisseurs = table.Column<int>(nullable: false),
                    FournisseursId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDocumentsFournisseurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppDocumentsFournisseurs_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppProducts",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    Icon = table.Column<byte[]>(unicode: false, maxLength: 256, nullable: true),
                    BuyingPrice = table.Column<decimal>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDiscontinued = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    ProductCategoryId = table.Column<int>(nullable: false),
                    FournisseursId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppProducts_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppProducts_AppProductCategories_ProductCategoryId",
                        column: x => x.ProductCategoryId,
                        principalTable: "AppProductCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppSecteursFournisseurs",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    FournisseursId = table.Column<int>(nullable: false),
                    SecteursId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSecteursFournisseurs", x => new { x.FournisseursId, x.SecteursId });
                    table.ForeignKey(
                        name: "FK_AppSecteursFournisseurs_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppSecteursFournisseurs_AppSecteurs_SecteursId",
                        column: x => x.SecteursId,
                        principalTable: "AppSecteurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateTable(
                name: "AppDemandes",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    userId = table.Column<string>(nullable: true),
                    DateDemande = table.Column<DateTime>(nullable: false),
                    Motif = table.Column<string>(nullable: true),
                    Montant = table.Column<decimal>(nullable: false),
                    TypeLigne = table.Column<int>(nullable: false),
                    Nature = table.Column<int>(nullable: false),
                    DateLivraisonPrevu = table.Column<DateTime>(nullable: false),
                    DateLivraison = table.Column<DateTime>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantite = table.Column<int>(nullable: false),
                    ProcessId = table.Column<int>(nullable: false),
                    CurrentStatId = table.Column<int>(nullable: false),
                    FournisseursId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDemandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppDemandes_WorkEtats_CurrentStatId",
                        column: x => x.CurrentStatId,
                        principalTable: "WorkEtats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDemandes_AppFournisseurs_FournisseursId",
                        column: x => x.FournisseursId,
                        principalTable: "AppFournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppDemandes_WorkProcess_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "WorkProcess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDemandes_AppProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "AppProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDemandes_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppOrderDetails",
                columns: table => new
                {
                    CreatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UnitPrice = table.Column<decimal>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    Discount = table.Column<decimal>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppOrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppOrderDetails_AppOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "AppOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppOrderDetails_AppProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "AppProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                    DemandesId = table.Column<int>(nullable: false),
                    dateOperation = table.Column<DateTime>(nullable: false),
                    Comment = table.Column<string>(nullable: true)
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
                        name: "FK_AppActionsHistories_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
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

            migrationBuilder.CreateTable(
                name: "AppApprobationWorkflow",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ApprobationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    LevelId = table.Column<int>(nullable: true),
                    LevelStatut = table.Column<int>(nullable: false),
                    GlobalStatut = table.Column<int>(nullable: false),
                    ValitationRequieredNumber = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    DemandesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppApprobationWorkflow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppApprobationWorkflow_AppDemandes_DemandesId",
                        column: x => x.DemandesId,
                        principalTable: "AppDemandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppApprobationWorkflow_AppApprobationLevel_LevelId",
                        column: x => x.LevelId,
                        principalTable: "AppApprobationLevel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppApprobationWorkflow_AspNetUsers_UserId",
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
                    TransitionId = table.Column<int>(nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_ActionsId",
                table: "AppActionsHistories",
                column: "ActionsId");

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_DemandesId",
                table: "AppActionsHistories",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_EtatId",
                table: "AppActionsHistories",
                column: "EtatId");

            migrationBuilder.CreateIndex(
                name: "IX_AppActionsHistories_UserId",
                table: "AppActionsHistories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAgences_VillesId",
                table: "AppAgences",
                column: "VillesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAPGmembers_ApprobationLevelId",
                table: "AppAPGmembers",
                column: "ApprobationLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAPGmembers_MemberId",
                table: "AppAPGmembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_AppApprobationWorkflow_DemandesId",
                table: "AppApprobationWorkflow",
                column: "DemandesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppApprobationWorkflow_LevelId",
                table: "AppApprobationWorkflow",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_AppApprobationWorkflow_UserId",
                table: "AppApprobationWorkflow",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBankInfos_BankName",
                table: "AppBankInfos",
                column: "BankName");

            migrationBuilder.CreateIndex(
                name: "IX_AppBankInfos_FournisseursId",
                table: "AppBankInfos",
                column: "FournisseursId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppBankInfos_VillesId",
                table: "AppBankInfos",
                column: "VillesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppCustomers_Name",
                table: "AppCustomers",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_CurrentStatId",
                table: "AppDemandes",
                column: "CurrentStatId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_FournisseursId",
                table: "AppDemandes",
                column: "FournisseursId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_ProcessId",
                table: "AppDemandes",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_ProductId",
                table: "AppDemandes",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDemandes_userId",
                table: "AppDemandes",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDevises_Label",
                table: "AppDevises",
                column: "Label");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentsFournisseurs_FournisseursId",
                table: "AppDocumentsFournisseurs",
                column: "FournisseursId");

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_AgencesId",
                table: "AppEntrepriseUserInfos",
                column: "AgencesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_ApplicationUserId",
                table: "AppEntrepriseUserInfos",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_DepartementsId",
                table: "AppEntrepriseUserInfos",
                column: "DepartementsId");

            migrationBuilder.CreateIndex(
                name: "IX_AppEntrepriseUserInfos_ServicesId",
                table: "AppEntrepriseUserInfos",
                column: "ServicesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_DevisesId",
                table: "AppFournisseurs",
                column: "DevisesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_Titre",
                table: "AppFournisseurs",
                column: "Titre");

            migrationBuilder.CreateIndex(
                name: "IX_AppFournisseurs_VillesId",
                table: "AppFournisseurs",
                column: "VillesId");

            migrationBuilder.CreateIndex(
                name: "IX_AppOrderDetails_OrderId",
                table: "AppOrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_AppOrderDetails_ProductId",
                table: "AppOrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_AppOrders_CashierId",
                table: "AppOrders",
                column: "CashierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppOrders_CustomerId",
                table: "AppOrders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPays_Name",
                table: "AppPays",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppProducts_FournisseursId",
                table: "AppProducts",
                column: "FournisseursId");

            migrationBuilder.CreateIndex(
                name: "IX_AppProducts_Name",
                table: "AppProducts",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppProducts_ProductCategoryId",
                table: "AppProducts",
                column: "ProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppSecteurs_Name",
                table: "AppSecteurs",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppSecteursFournisseurs_SecteursId",
                table: "AppSecteursFournisseurs",
                column: "SecteursId");

            migrationBuilder.CreateIndex(
                name: "IX_AppServices_DepartementsId",
                table: "AppServices",
                column: "DepartementsId");

            migrationBuilder.CreateIndex(
                name: "IX_AppServices_HeadId",
                table: "AppServices",
                column: "HeadId");

            migrationBuilder.CreateIndex(
                name: "IX_AppVilles_Name",
                table: "AppVilles",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AppVilles_PaysId",
                table: "AppVilles",
                column: "PaysId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictApplications_ClientId",
                table: "OpenIddictApplications",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictAuthorizations_ApplicationId",
                table: "OpenIddictAuthorizations",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictScopes_Name",
                table: "OpenIddictScopes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ApplicationId",
                table: "OpenIddictTokens",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_AuthorizationId",
                table: "OpenIddictTokens",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ReferenceId",
                table: "OpenIddictTokens",
                column: "ReferenceId",
                unique: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_WorkTransitionActivite_TransitionId",
                table: "WorkTransitionActivite",
                column: "TransitionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppActionsHistories");

            migrationBuilder.DropTable(
                name: "AppAPGmembers");

            migrationBuilder.DropTable(
                name: "AppApprobationWorkflow");

            migrationBuilder.DropTable(
                name: "AppBankInfos");

            migrationBuilder.DropTable(
                name: "AppDocumentsFournisseurs");

            migrationBuilder.DropTable(
                name: "AppEntreprise");

            migrationBuilder.DropTable(
                name: "AppEntrepriseUserInfos");

            migrationBuilder.DropTable(
                name: "AppOrderDetails");

            migrationBuilder.DropTable(
                name: "AppSecteursFournisseurs");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "OpenIddictScopes");

            migrationBuilder.DropTable(
                name: "OpenIddictTokens");

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
                name: "WorkTransitionActivite");

            migrationBuilder.DropTable(
                name: "AppApprobationLevel");

            migrationBuilder.DropTable(
                name: "AppAgences");

            migrationBuilder.DropTable(
                name: "AppServices");

            migrationBuilder.DropTable(
                name: "AppOrders");

            migrationBuilder.DropTable(
                name: "AppSecteurs");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "OpenIddictAuthorizations");

            migrationBuilder.DropTable(
                name: "WorkGroup");

            migrationBuilder.DropTable(
                name: "AppDemandes");

            migrationBuilder.DropTable(
                name: "WorkActions");

            migrationBuilder.DropTable(
                name: "WorkActivite");

            migrationBuilder.DropTable(
                name: "WorkTransition");

            migrationBuilder.DropTable(
                name: "AppDepartements");

            migrationBuilder.DropTable(
                name: "AppCustomers");

            migrationBuilder.DropTable(
                name: "OpenIddictApplications");

            migrationBuilder.DropTable(
                name: "AppProducts");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "WorkEtats");

            migrationBuilder.DropTable(
                name: "AppFournisseurs");

            migrationBuilder.DropTable(
                name: "AppProductCategories");

            migrationBuilder.DropTable(
                name: "WorkProcess");

            migrationBuilder.DropTable(
                name: "AppDevises");

            migrationBuilder.DropTable(
                name: "AppVilles");

            migrationBuilder.DropTable(
                name: "AppPays");
        }
    }
}

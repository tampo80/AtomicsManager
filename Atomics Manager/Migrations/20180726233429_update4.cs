using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AtomicsManager.Migrations
{
    public partial class update4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Icon",
                table: "AppProducts",
                unicode: false,
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 256,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Icon",
                table: "AppProducts",
                unicode: false,
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(byte[]),
                oldUnicode: false,
                oldMaxLength: 256,
                oldNullable: true);
        }
    }
}

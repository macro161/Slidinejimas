using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Visitors.Migrations
{
    public partial class fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trasos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Aprasymas = table.Column<string>(nullable: true),
                    DarboLaikas = table.Column<string>(maxLength: 20, nullable: true),
                    IlgisMetrais = table.Column<int>(nullable: false),
                    Pavadinimas = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trasos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trasos");
        }
    }
}

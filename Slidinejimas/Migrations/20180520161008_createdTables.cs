using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Visitors.Migrations
{
    public partial class createdTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropTable(
                name: "Sites");

            migrationBuilder.CreateTable(
                name: "Paslaugos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Informacija = table.Column<string>(nullable: true),
                    Pavadinimas = table.Column<string>(nullable: true),
                    Paveiksliukas = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paslaugos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaslauguKrepseliai",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    BaigimosiData = table.Column<DateTime>(nullable: false),
                    Id_paslaugos = table.Column<Guid>(nullable: false),
                    Id_vartotojo = table.Column<Guid>(nullable: false),
                    UzsakymoData = table.Column<DateTime>(nullable: false),
                    Vienetai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaslauguKrepseliai", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statistika",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    GreiciausiasLaikas = table.Column<double>(nullable: false),
                    Id_trasos = table.Column<Guid>(nullable: false),
                    Id_vartojo = table.Column<Guid>(nullable: false),
                    PaskutinioApsilankymoData = table.Column<DateTime>(nullable: false),
                    PraleistasLaias = table.Column<double>(nullable: false),
                    VidutinisGreitis = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistika", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zinutes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Data = table.Column<DateTime>(nullable: false),
                    Id_gavejo = table.Column<Guid>(nullable: false),
                    Id_siuntejo = table.Column<Guid>(nullable: false),
                    Tekstas = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zinutes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Paslaugos");

            migrationBuilder.DropTable(
                name: "PaslauguKrepseliai");

            migrationBuilder.DropTable(
                name: "Statistika");

            migrationBuilder.DropTable(
                name: "Zinutes");

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Awaiter = table.Column<string>(maxLength: 100, nullable: true),
                    CheckInTime = table.Column<DateTime>(type: "datetime2(7)", nullable: true),
                    CheckOutTime = table.Column<DateTime>(type: "datetime2(7)", nullable: true),
                    CompanyName = table.Column<string>(maxLength: 50, nullable: true),
                    Img = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Site = table.Column<Guid>(nullable: false),
                    Surname = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sites",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Address = table.Column<string>(maxLength: 100, nullable: true),
                    ContactEmail = table.Column<string>(maxLength: 50, nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Phone = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sites", x => x.Id);
                });
        }
    }
}

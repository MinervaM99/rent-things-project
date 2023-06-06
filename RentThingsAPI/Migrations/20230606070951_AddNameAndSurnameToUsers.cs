using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentThingsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddNameAndSurnameToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.AddColumn<string>(
				name: "Nume",
				table: "AspNetUsers",
				type: "varchar(100)",
				nullable: true);

			migrationBuilder.AddColumn<string>(
				name: "Prenume",
				table: "AspNetUsers",
				type: "varchar(100)",
				nullable: true);
		}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DropColumn(
			name: "Nume",
			table: "Users");

			migrationBuilder.DropColumn(
				name: "Prenume",
				table: "Users");
		}
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentThingsAPI.Migrations
{
    /// <inheritdoc />
    public partial class Last : Migration
    {
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Transactions_Items_ItemId",
				table: "Transactions");

			migrationBuilder.AlterColumn<int>(
				name: "ItemId",
				table: "Transactions",
				type: "int",
				nullable: false,
				oldClrType: typeof(int),
				oldType: "int",
				oldNullable: false);

			migrationBuilder.AddForeignKey(
				name: "FK_Transactions_Items_ItemId",
				table: "Transactions",
				column: "ItemId",
				principalTable: "Items",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Transactions_Items_ItemId",
				table: "Transactions");

			migrationBuilder.AlterColumn<int>(
				name: "ItemId",
				table: "Transactions",
				type: "int",
				nullable: false,
				oldClrType: typeof(int),
				oldType: "int",
				oldNullable: false);

			migrationBuilder.AddForeignKey(
				name: "FK_Transactions_Items_ItemId",
				table: "Transactions",
				column: "ItemId",
				principalTable: "Items",
				principalColumn: "Id",
				onDelete: ReferentialAction.NoAction);
		}
	}
}

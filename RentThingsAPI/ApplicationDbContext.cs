using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RentThingsAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace RentThingsAPI
{
	public class ApplicationDbContext : IdentityDbContext
	{
		public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}

		public DbSet<Category> Categories { get; set; }
		public DbSet<Item> Items { get; set; }
		public DbSet<Transaction>	Transactions { get; set; }
	}
}

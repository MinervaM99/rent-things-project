using Microsoft.EntityFrameworkCore;
using RentThingsAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace RentThingsAPI
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
		{
		}

		public DbSet<Category> Categories { get; set; }
	}
}

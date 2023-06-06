using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RentThingsAPI.DTOs;
using RentThingsAPI.Helpers;
using RentThingsAPI.Entities;

namespace RentThingsAPI.Controllers
{

	[ApiController]
	[Route("api/transactions")]
	public class TransactionsController : ControllerBase
	{
		private readonly ApplicationDbContext context;
		private readonly UserManager<IdentityUser> userManager;
		private readonly IMapper mapper;

		public TransactionsController(ApplicationDbContext context, UserManager<IdentityUser> userManager, IMapper mapper)
		{
			this.context = context;
			this.userManager = userManager;
			this.mapper = mapper;
		}
		[HttpPost]
		public async Task<ActionResult> Post([FromForm] TransactionDTO transactionDTO)
		{
			var newTransaction = mapper.Map<Transaction>(transactionDTO);
			context.Add(newTransaction);
			await context.SaveChangesAsync();
			return NoContent();

		}


	}
}

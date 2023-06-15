using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RentThingsAPI.DTOs;
using RentThingsAPI.Helpers;
using RentThingsAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace RentThingsAPI.Controllers
{

	[ApiController]
	[Route("api/transactions")]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public class TransactionsController : ControllerBase
	{
		private readonly ApplicationDbContext context;
		private readonly UserManager<IdentityUser> userManager;
		private readonly IMapper mapper;
		private readonly ILogger<CategoriesController> logger;

		public TransactionsController(ApplicationDbContext context, 
			UserManager<IdentityUser> userManager, 
			IMapper mapper,
			ILogger<CategoriesController> logger)
		{
			this.context = context;
			this.userManager = userManager;
			this.mapper = mapper;
			this.logger = logger;
		}

		//add new transaction
		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TransactionCreationDTO transactionDTO)
		{
			bool isOverlap = CheckDateOverlap(transactionDTO.ItemId, (DateTime)transactionDTO.StartDate, (DateTime)transactionDTO.EndDate);

			if (isOverlap)
			{
				return BadRequest("Intervalul de date selecat se suprapune cu o tranzacție existentă");
			}

			var newTransaction = mapper.Map<Transaction>(transactionDTO);
			context.Add(newTransaction);
			await context.SaveChangesAsync();
			return NoContent();
		}

		//edit status of transaction
		[HttpPost("editStatus/{id}")]
		public async Task<ActionResult> UpdateStatus(string id, [FromBody] int newStatus)
		{
			var transaction = await context.Transactions.FirstOrDefaultAsync(t => t.Id == id);

			if (transaction == null)
			{
				return NotFound();
			}

			transaction.Status = newStatus;
			await context.SaveChangesAsync();

			if (newStatus == 2)
			{
				var overlappingTransactions = await context.Transactions
					.Where(t => t.ItemId == transaction.ItemId &&
								t.StartDate <= transaction.EndDate &&
								t.EndDate >= transaction.StartDate &&
								t.Status == 1)
					.ToListAsync();

				foreach (var overlappingTransaction in overlappingTransactions)
				{
					overlappingTransaction.Status = 3;
				}

				await context.SaveChangesAsync();
			}

			return NoContent();
		}



		//get all transactions
		[HttpGet]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllTransactuins([FromQuery] PaginationDTO paginationDTO)
		{
			var queryable = context.Transactions
					.Include(x => x.User)
					.Include(x => x.Item)
					.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}

		//get transaction by ItemId
		[HttpGet("{itemId:int}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetTransaction(int itemId)
		{
			var today = DateTime.Now;
			var transaction = await context.Transactions.Include(x => x.User).Include(x => x.Item)
				.Where(t => t.ItemId == itemId && t.StartDate > today)
				.ToListAsync();

			return mapper.Map<List<TransactionDTO>>(transaction);
		}



		//get all transaction by LenderId
		[HttpGet("lend/{lenderId}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllByLender([FromQuery] PaginationDTO paginationDTO, string lenderId, [FromQuery]  int status)
		{
			if (status < 1 || status > 3)
			{
				return BadRequest("Invalid status value. Status should be between 1 and 3.");
			}
			var userIdLend = await userManager.FindByNameAsync(lenderId);
			if(userIdLend == null) { return NotFound(); }
			var queryable = context.Transactions
								.Include(t => t.Item).Include(x => x.User).Include(x => x.Item)
								.Where(t => t.Item.UserId == userIdLend.Id && t.Status == status)
								.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}


		////get all transaction by borrower UserName 
		[HttpGet("borrow/{borrowerId}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllByBorrower([FromQuery] PaginationDTO paginationDTO, string borrowerId)
		{
			var userIdBorrower = await userManager.FindByNameAsync(borrowerId);
			if (userIdBorrower == null) { return NotFound(); }
			var queryable = context.Transactions.Include(x=>x.User).Include(x=>x.Item)
								.Where(t => t.UserId == userIdBorrower.Id)
								.AsQueryable(); 
			
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}

		//delete a transaction by Id
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteItem(string Id)
		{

			var transaction = await context.Transactions.FirstOrDefaultAsync(x => x.Id == Id);
			if (transaction == null) { return NotFound(); };

			context.Remove(transaction);
			await context.SaveChangesAsync();
			return Ok(transaction);
		}


		private bool CheckDateOverlap(int itemId, DateTime _startDate, DateTime _endDate)
		{
			DateTime startDate = _startDate.ToUniversalTime();
			DateTime endDate = _endDate.ToUniversalTime();

			// Verifică dacă există o tranzacție existentă care se suprapune cu intervalul de date dorit
			var overlappingTransaction = context.Transactions.FirstOrDefault(t =>
						t.ItemId == itemId &&
						t.Status == 2 &&
						t.StartDate <= endDate &&
						t.EndDate >= startDate);

			return overlappingTransaction != null;
		}
	}
	

}

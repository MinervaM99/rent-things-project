using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RentThingsAPI.DTOs;
using RentThingsAPI.Helpers;
using RentThingsAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RentThingsAPI.Controllers
{

	[ApiController]
	[Route("api/transactions")]
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
		[HttpPost]
		[Route("edit/{id}")]
		public async Task<ActionResult> UpdateStatus(string id, [FromBody] int newStatus)
		{
			var transaction = await context.Transactions.FirstOrDefaultAsync(t => t.Id == id);

			if (transaction == null)
			{
				return NotFound();
			}
			transaction.Status = newStatus;

			await context.SaveChangesAsync(); 

			return NoContent(); 
		}



		//get all transactions
		[HttpGet]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllTransactuins([FromQuery] PaginationDTO paginationDTO)
		{
			logger.LogInformation("Getting all the transactions");
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
			var transaction = await context.Transactions
				.Where(t => t.ItemId == itemId && t.StartDate > today)
				.ToListAsync();

			return mapper.Map<List<TransactionDTO>>(transaction);
		}



		//get all transaction by LenderId
		[HttpGet("lend/{lenderId}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllByLender([FromQuery] PaginationDTO paginationDTO, string lenderId)
		{
			logger.LogInformation("Getting all for the lender");
			var queryable = context.Transactions
								.Include(x => x.User)
								.Include(t => t.Item)
								.Where(t => t.Item.UserId == lenderId)
								.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}


		////get all transaction by BorroweId 
		[HttpGet("borrow/{borrowerId}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllByBorrower([FromQuery] PaginationDTO paginationDTO, string borrowerId)
		{
			logger.LogInformation("Getting all for the lender");
			var queryable = context.Transactions
								.Include(x => x.User)
								.Include(t => t.Item)
								.Where(t => t.User.UserName == borrowerId)
								.AsQueryable(); 
			
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
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

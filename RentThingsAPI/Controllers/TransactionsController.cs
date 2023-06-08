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
		[HttpPost]
		public async Task<ActionResult> Post([FromForm] TransactionDTO transactionDTO)
		{
			var newTransaction = mapper.Map<Transaction>(transactionDTO);
			context.Add(newTransaction);
			await context.SaveChangesAsync();
			return NoContent();

		}

		[HttpGet]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllTransactuins([FromQuery] PaginationDTO paginationDTO)
		{
			logger.LogInformation("Getting all the transactions");
			var queryable = context.Transactions.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}

		//get one transaction by BorrowerId
		[HttpGet("borrow/{borrowerId}")]
		public async Task<ActionResult<TransactionDTO>> GetTransaction(string lenderId)
		{
			var transaction = await context.Transactions.Where(t => t.UserId == lenderId)
								.FirstOrDefaultAsync();

			return mapper.Map<TransactionDTO>(transaction);
		}


		//get all transaction by LenderId
		[HttpGet("{lenderId}")]
		public async Task<ActionResult<List<TransactionDTO>>> GetAllByLender([FromQuery] PaginationDTO paginationDTO, string lenderId)
		{
			logger.LogInformation("Getting all for the lender");
			var queryable = context.Transactions.Include(t => t.Item).Where(t => t.Item.UserId == lenderId)
								.AsQueryable();
			await HttpContext.InsertParametersPaginationInHeader(queryable);

			var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
			return mapper.Map<List<TransactionDTO>>(transactions);
		}


		////get all transaction by BorroweId
		//[HttpGet("{borrowerId}")]
		//public async Task<ActionResult<List<TransactionDTO>>> GetAllByBorrower([FromQuery] PaginationDTO paginationDTO, string borrowerId)
		//{
		//	logger.LogInformation("Getting all for the lender");
		//	var queryable = context.Transactions.Where(t => t.UserId == borrowerId)
		//						.AsQueryable();
		//	await HttpContext.InsertParametersPaginationInHeader(queryable);

		//	var transactions = await queryable.OrderBy(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
		//	return mapper.Map<List<TransactionDTO>>(transactions);
		//}

	}
}

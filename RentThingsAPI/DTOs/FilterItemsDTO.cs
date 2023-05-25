namespace RentThingsAPI.DTOs
{
	public class FilterItemsDTO
	{
		public int Page { get; set; }
		public int RecordsPerPage { get; set; }
		public PaginationDTO PaginationDTO
		{
			get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }
		}
		public string Name { get; set; }	
		public int CategoryId { get; set; }
		public string BorrowerId { get; set; }
		public int Condition { get; set; }
	}
}

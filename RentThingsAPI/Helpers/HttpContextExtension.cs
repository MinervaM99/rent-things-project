using Microsoft.EntityFrameworkCore;

namespace RentThingsAPI.Helpers
{
	//static class because we use an extension method
	public static class HttpContextExtension
	{
		public async static Task InsertParametersPaginationInHeader<T>(this HttpContext httpContext, 
			IQueryable<T> queryable)
		{
			if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

			double count = await queryable.CountAsync();
			//punem in header-ul raspunsului http, numarul total de inregistrari din tabel
			httpContext.Response.Headers.Add("totalAmountOfRecords", count.ToString());

		}
	}
}

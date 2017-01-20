namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using server.Services;
    using System.Threading.Tasks;
    using server.Services.Flipkart;

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly IHttpService httpService;

        public SearchController(IHttpService httpService)
        {
            this.httpService = httpService;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> SearchFlipkart(int pageNumber, int pageCount, [FromQuery] string query)
        {
            FlipkartSearchService flipkartService = new FlipkartSearchService(httpService);
            var result = await flipkartService.Search(query, pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}

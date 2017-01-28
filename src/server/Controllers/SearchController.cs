namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using server.Services;
    using System.Threading.Tasks;
    using server.Services.Flipkart;
    using Microsoft.Extensions.Configuration;

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly IHttpService httpService;
        private readonly IConfiguration configuration;

        public SearchController(IHttpService httpService, IConfiguration configuration)
        {
            this.httpService = httpService;
            this.configuration = configuration;
        }

        [HttpGet("flipkart")]
        public async Task<JsonResult> SearchFlipkart([FromQuery] string query)
        {
            FlipkartSearchService flipkartService = new FlipkartSearchService(httpService, configuration);
            var result = await flipkartService.Search(query);

            return new JsonResult(result);
        }
    }
}

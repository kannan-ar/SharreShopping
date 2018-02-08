namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;

    using Models;
    using Services.Flipkart;
    using Services.Amazon;
    using Services;

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly IHttpService httpService;
        private readonly ShoppingSiteConfig config;

        public SearchController(IHttpService httpService, IOptions<ShoppingSiteConfig> config)
        {
            this.httpService = httpService;
            this.config = config.Value;
        }

        [HttpGet("flipkart")]
        public async Task<JsonResult> SearchFlipkart([FromQuery] string query)
        {
            FlipkartSearchService flipkartService = new FlipkartSearchService(httpService, config);
            var result = await flipkartService.Search(query);

            return new JsonResult(result);
        }

        [HttpGet("amazon")]
        public async Task<JsonResult> AmazonSignedUrl([FromQuery] string query)
       {
            AmazonProductService service = new AmazonProductService(new AmazonService(httpService, config));
            var result = await service.Search(query);

            return new JsonResult(result);
        }
    }
}

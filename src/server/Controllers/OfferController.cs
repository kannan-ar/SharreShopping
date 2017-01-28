namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using server.Services;
    using System.Threading.Tasks;
    using server.Services.Flipkart;
    using Microsoft.Extensions.Configuration;

    [Route("api/[controller]")]
    public class OfferController : Controller
    {
        private readonly IHttpService httpService;
        private readonly IConfiguration configuration;

        public OfferController(IHttpService httpService, IConfiguration configuration)
        {
            this.httpService = httpService;
            this.configuration = configuration;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
        {
            FlipkartOfferService flipkartService = new FlipkartOfferService(httpService, configuration);
            var result = await flipkartService.GetOffers(pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}
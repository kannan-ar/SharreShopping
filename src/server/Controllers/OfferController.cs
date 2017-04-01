namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;

    using Models;
    using Services;
    using Services.Flipkart;


    [Route("api/[controller]")]
    public class OfferController : Controller
    {
        private readonly IHttpService httpService;
        private readonly ShoppingSiteConfig config;

        public OfferController(IHttpService httpService, IOptions<ShoppingSiteConfig> config)
        {
            this.httpService = httpService;
            this.config = config.Value;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
        {
            FlipkartOfferService flipkartService = new FlipkartOfferService(httpService, config);
            var result = await flipkartService.GetOffers(pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}
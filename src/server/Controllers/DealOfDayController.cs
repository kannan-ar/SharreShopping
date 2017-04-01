namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;

    using Models;
    using Services;
    using Services.Flipkart;

    [Route("api/[controller]")]
    public class DealOfDayController : Controller
    {
        private readonly IHttpService httpService;
        private readonly ShoppingSiteConfig config;

        public DealOfDayController(IHttpService httpService, IOptions<ShoppingSiteConfig> config)
        {
            this.httpService = httpService;
            this.config = config.Value;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
        {
            FlipkartDealOfDayService flipkartService = new FlipkartDealOfDayService(httpService, config);
            var result = await flipkartService.GetDealOfDay(pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}
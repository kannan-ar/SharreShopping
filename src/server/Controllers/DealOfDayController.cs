namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using server.Services;
    using System.Threading.Tasks;
    using server.Services.Flipkart;

    [Route("api/[controller]")]
    public class DealOfDayController : Controller
    {
        private readonly IHttpService httpService;

        public DealOfDayController(IHttpService httpService)
        {
            this.httpService = httpService;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
        {
            FlipkartDealOfDayService flipkartService = new FlipkartDealOfDayService(httpService);
            var result = await flipkartService.GetDealOfDay(pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}
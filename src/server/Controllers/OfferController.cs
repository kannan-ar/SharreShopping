namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using server.Services;
    using System.Threading.Tasks;
    using server.Services.Flipkart;

    [Route("api/[controller]")]
    public class OfferController : Controller
    {
        private readonly IHttpService httpService;

        public OfferController(IHttpService httpService)
        {
            this.httpService = httpService;
        }

        [HttpGet("flipkart/{pageNumber}/{pageCount}")]
        public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
        {
            FlipkartOfferService flipkartService = new FlipkartOfferService(httpService);
            var result = await flipkartService.GetOffers(pageNumber, pageCount);

            return new JsonResult(result);
        }
    }
}
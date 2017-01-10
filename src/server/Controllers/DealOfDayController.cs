namespace server.Controllers
{
        using Microsoft.AspNetCore.Mvc;
        using server.Services;
        using System.Threading.Tasks;
        using server.Services.Flipkart;
        
        [Route("api/[controller]")]
        public class DealOfDayController : Controller
        {
                private readonly IShoppingService service;

                public DealOfDayController(IShoppingService service)
                {
                        this.service = service;
                }

                [HttpGet("flipkart/{pageNumber}/{pageCount}")]
                public async Task<JsonResult> GetFlipkart(int pageNumber, int pageCount)
                {
                        FlipkartService flipkartService = new FlipkartService(service);
                        var result = await flipkartService.GetDealOfDay(pageNumber, pageCount);

                        return new JsonResult(result);
                }
        }
}
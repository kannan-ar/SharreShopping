namespace server.Controllers
{
         using Microsoft.AspNetCore.Mvc;
        using server.Services;
        using System.Threading.Tasks;
        using server.Services.Flipkart;

        [Route("api/[controller]")]
        public class OfferController : Controller
        {
                 private readonly IShoppingService service;

                 public OfferController(IShoppingService service)
                 {
                         this.service = service;
                 }

                  [HttpGet("flipkart/{pageNumber}/{pageCount}")]
                public async Task<JsonResult> GetFlipkart(int currentIndex, int pageCount)
                {
                        FlipkartService flipkartService = new FlipkartService(service);
                        var result = await flipkartService.GetOffers(currentIndex, pageCount);

                        return new JsonResult(result);
                }
        }
}
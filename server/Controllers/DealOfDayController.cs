namespace server.Controllers
{
        using Microsoft.AspNetCore.Mvc;
        using server.Services;
        using System.Threading.Tasks;

        [Route("api/[controller]")]
        public class DealOfDayController : Controller
        {
                private readonly IShoppingService service;

                public DealOfDayController(IShoppingService service)
                {
                        this.service = service;
                }

                [HttpGet("flipkart")]
                public async Task<string> GetFlipkart()
                {
                        return await service.Get(server.Services.Flipkart.FlipkartService.DealOfDayApi,
                            server.Services.Flipkart.FlipkartService.DefaultHeaders);
                }
        }
}
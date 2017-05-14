namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using System.Security.Claims;
    using System;
    using Microsoft.Extensions.Options;
    using System.Threading.Tasks;

    using Services.Account;
    using Models;
    using Services;
    using Services.Flipkart;
    using Services.Amazon;
    using Services.Ebay;

    [Route("api/[controller]")]
    public class WishlistController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly IHttpService httpService;
        private readonly ShoppingSiteConfig config;

        public WishlistController(IServiceProvider serviceProvider, IHttpService httpService, IOptions<ShoppingSiteConfig> config)
        {
            this.serviceProvider = serviceProvider;
            this.httpService = httpService;
            this.config = config.Value;
        }

        [Authorize]
        [HttpPost("add/{provider}/{id}")]
        public IActionResult Save(string provider, string id)
        {
            WishlistService wishlistService = new WishlistService(this.serviceProvider);
            wishlistService.Save(User.Identity as ClaimsIdentity, provider, id);
            return Ok();
        }

        [Authorize]
        [HttpPost("remove/{provider}/{id}")]
        public IActionResult Remove(string provider, string id)
        {
            WishlistService wishlistService = new WishlistService(this.serviceProvider);
            wishlistService.Remove(User.Identity as ClaimsIdentity, provider, id);
            return Ok();
        }

        [Authorize]
        [HttpGet("flipkart")]
        public async Task<JsonResult> GetFlipkart()
        {
            FlipkartWishlistService service = new FlipkartWishlistService(httpService, config, serviceProvider);
            return Json(await service.Get(User.Identity as ClaimsIdentity));
        }

        [Authorize]
        [HttpGet("flipkart/{id}")]
        public async Task<JsonResult> GetFlipkart(string id)
        {
            FlipkartWishlistService flipkartService = new FlipkartWishlistService(httpService, config, serviceProvider);
            return new JsonResult(await flipkartService.Get(id));
        }

        [Authorize]
        [HttpGet("amazon")]
        public async Task<JsonResult> GetAmazon()
        {
            AmazonWishlistService service = new AmazonWishlistService(new AmazonService(httpService, config));
            return Json(await service.GetWishlistItems(serviceProvider, User.Identity as ClaimsIdentity));
        }

        [Authorize]
        [HttpPost("amazon")]
        public async Task<JsonResult> GetAmazon([FromBody] string[] ids)
        {
            AmazonWishlistService service = new AmazonWishlistService(new AmazonService(httpService, config));
            return Json(await service.GetWishlistItems(ids));
        }

        [Authorize]
        [HttpGet("ebay")]
        public async Task<JsonResult> GetEbay()
        {
            EbayService service = new EbayService(serviceProvider, httpService);
            return Json(await service.Get(User.Identity as ClaimsIdentity));
        }

        [Authorize]
        [HttpGet("ebay/{id}")]
        public async Task<JsonResult> GetEbay(string id)
        {
            EbayService service = new EbayService(serviceProvider, httpService);
            return Json(await service.Get(id));
        }
    }
}

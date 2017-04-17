namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using System.Security.Claims;
    using System;

    using Services;

    [Route("api/[controller]")]
    public class WishlistController : Controller
    {
        private IServiceProvider serviceProvider;

        public WishlistController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        [Authorize]
        [HttpPost("add/{provider}/{id}")]
        public IActionResult Save(string provider, string id)
        {
            WishlistService wishlistService = new WishlistService(this.serviceProvider);

            wishlistService.Save(User.Identity as ClaimsIdentity, provider, id);

            return Ok();
        }
    }
}

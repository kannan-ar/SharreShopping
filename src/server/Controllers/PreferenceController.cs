namespace server.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Services.Account;

    [Route("api/[controller]")]
    public class PreferenceController : Controller
    {
        private readonly IServiceProvider serviceProvider;

        public PreferenceController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        [Authorize]
        [HttpPost("save")]
        public IActionResult Save([FromBody] string[] words)
        {
            PreferenceService service = new PreferenceService(serviceProvider);
            service.Save(User.Identity as ClaimsIdentity, words);

            return Ok();
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<JsonResult> Get()
        {
            PreferenceService service = new PreferenceService(serviceProvider);
            return Json(await service.Get(User.Identity as ClaimsIdentity));
        }
    }
}

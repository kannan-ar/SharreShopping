namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;
    using System;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Authentication;
    using System.Threading.Tasks;

    using Models;
    using Models.Account;
    using Services;
    using Services.Account;

    public class User
    {
        public string Name { get; set; }
    }

    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private AuthConfig config;
        private long ToUnixEpochDate(DateTime date) => (long)Math.Round((date.ToUniversalTime() -
                       new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                      .TotalSeconds);

        public AccountController(IOptions<AuthConfig> config)
        {
            this.config = config.Value;
        }

        [HttpGet("External/{provider}")]
        public IActionResult External(string provider)
        {
            var authProperties = new AuthenticationProperties
            {
                RedirectUri = "/api/account/secure"
            };

            switch (provider.ToLower())
            {
                case "google":
                    return new ChallengeResult("Google", authProperties);
                case "facebook":
                    return new ChallengeResult("Facebook", authProperties);
            }

            return NotFound();
        }

        [HttpGet("Secure")]
        public async Task<IActionResult> Secure()
        {
            ClaimsIdentity id = User.Identity as ClaimsIdentity;
            string token = await HttpContext.GetTokenAsync(ShoppingContext.MiddlewareName, "access_token");

            return await Task.FromResult<IActionResult>(Content("<script type=\"text/javascript\">window.opener.sessionStorage.setItem('AuthType','" + id.AuthenticationType + "');window.opener.sessionStorage.setItem('Token','" + token + "');window.opener.document.location.href='/';window.close();</script>", "text/html"));
        }

        [Authorize]
        [HttpGet("LoginInfo")]
        public IActionResult GetLoginInfo()
        {
            AccountService accountService = new AccountService();

            return Json(new LoginInfo() { Name = accountService.GetLoginName(User.Identity as ClaimsIdentity) });
        }

        [Authorize]
        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(ShoppingContext.MiddlewareName);

            return Ok();
        }
    }
}

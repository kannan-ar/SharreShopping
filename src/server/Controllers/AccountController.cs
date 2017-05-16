namespace server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http.Authentication;
    using System.Security.Claims;
    using System;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Authorization;

    using Models;
    using Models.Account;
    using Services.Account;

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
        public IActionResult Secure()
        {
            return Content("<script type=\"text/javascript\">window.opener.sessionStorage.setItem('HasToken','true');window.opener.document.location.href='/';window.close();</script>", "text/html");
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
            HttpContext.Authentication.SignOutAsync("SharreShoppingCookieMiddleware");

            return Ok();
        }
    }
}

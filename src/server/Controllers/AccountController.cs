namespace server.Controllers
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http.Authentication;
    using System.Security.Claims;
    using System.IdentityModel.Tokens.Jwt;
    using System;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using Microsoft.Extensions.Options;

    using Models;

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

        [HttpGet("External")]
        public IActionResult External()
        {
            var authProperties = new AuthenticationProperties
            {
                RedirectUri = "/api/account/secure"
            };

            return new ChallengeResult("Google", authProperties);
        }

        [HttpGet("Secure")]
        public IActionResult Secure()
        {
            ClaimsIdentity id = User.Identity as ClaimsIdentity;
            Dictionary<string, string> dict = new Dictionary<string, string>();
            Claim email = id.FindFirst(ClaimTypes.Email);
            Claim name = id.FindFirst(ClaimTypes.Name);

            HttpContext.Authentication.SignOutAsync("MyCookieMiddlewareInstance");

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email.Value),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,ToUnixEpochDate(DateTime.Now).ToString(), ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.GivenName, name.Value)
            };

            var jwt = new JwtSecurityToken(
               issuer: config.Jwt.Issuer,
               audience: config.Jwt.Audience,
               claims: claims,
               notBefore: DateTime.UtcNow,
               expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(5)),
               signingCredentials: new SigningCredentials(config.SymmetricKey, SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Content("<script type=\"text/javascript\">parent.window.opener.setAuth('" + encodedJwt + "');window.close();</script>", "text/html");
        }
    }
}

namespace server.Services.Account
{
    using System.Security.Claims;

    public class AccountService
    {
        public string GetLoginName(ClaimsIdentity identity)
        {
            Claim claim = identity.FindFirst(ClaimTypes.Name);
            string name = string.Empty;

            if (claim != null)
            {
                name = claim.Value;
            }

            return name;
        }

        public string GetLoginEmail(ClaimsIdentity identity)
        {
            Claim claim = identity.FindFirst(ClaimTypes.Email);
            string email = string.Empty;

            if (claim != null)
            {
                email = claim.Value;
            }

            return email;
        }
    }
}

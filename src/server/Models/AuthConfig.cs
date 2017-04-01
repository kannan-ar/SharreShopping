namespace server.Models
{
    using Microsoft.IdentityModel.Tokens;

    public class JwtConfig
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecurityKey { get; set; }
    }

    public class GoogleConfig
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
        
    public class AuthConfig
    {
        public JwtConfig Jwt { get; set; }
        public GoogleConfig Google { get; set; }
        public SymmetricSecurityKey SymmetricKey { get; set; }
    }
}

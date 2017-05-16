namespace server.Models
{
    public class GoogleConfig
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
        
    public class AuthConfig
    {
        public GoogleConfig Google { get; set; }
    }
}

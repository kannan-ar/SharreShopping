namespace server.Services
{
    using System;
    using StackExchange.Redis;
    using Account;
    using System.Security.Claims;
    using Microsoft.Extensions.DependencyInjection;

    public class WishlistService
    {
        private IServiceProvider serviceProvider;

        public WishlistService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        private void Save(string provider, string id, string email)
        {
            IConnectionMultiplexer redis = serviceProvider.GetService<IConnectionMultiplexer>();
            IDatabase db = redis.GetDatabase();

            db.SetAdd(string.Concat("wishlist:", email, ":", provider), id);
        }

        public void Save(ClaimsIdentity identity, string provider, string id)
        {
            AccountService accountService = new AccountService();

            string email = accountService.GetLoginEmail(identity);
            provider = provider.ToLower();

            switch (provider)
            {
                case "amazon":
                case "ebay":
                case "flipkart":
                    Save(provider, id, email);
                    break;
            }
        }
    }
}

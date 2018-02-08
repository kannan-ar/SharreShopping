namespace server.Services.Account
{
    using System;
    using System.Security.Claims;
    using Microsoft.Extensions.DependencyInjection;
    using StackExchange.Redis;

    public class WishlistService
    {
        private readonly IServiceProvider serviceProvider;

        public WishlistService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        private void Save(string provider, string id, string email)
        {
            Lazy<IConnectionMultiplexer> redis = serviceProvider.GetService<Lazy<IConnectionMultiplexer>>();
            IDatabase db = redis.Value.GetDatabase();

            db.SetAdd(string.Concat("wishlist:", email, ":", provider), id);
        }

        private void Remove(string provider, string id, string email)
        {
            Lazy<IConnectionMultiplexer> redis = serviceProvider.GetService<Lazy<IConnectionMultiplexer>>();
            IDatabase db = redis.Value.GetDatabase();

            db.SetRemove(string.Concat("wishlist:", email, ":", provider), id);
        }

        private string GetEmail(ClaimsIdentity identity)
        {
            AccountService accountService = new AccountService();

            return accountService.GetLoginEmail(identity);
        }

        public void Save(ClaimsIdentity identity, string provider, string id)
        {
            string email = GetEmail(identity);
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

        public void Remove(ClaimsIdentity identity, string provider, string id)
        {
            string email = GetEmail(identity);
            provider = provider.ToLower();

            switch (provider)
            {
                case "amazon":
                case "ebay":
                case "flipkart":
                    Remove(provider, id, email);
                    break;
            }
        }
    }
}

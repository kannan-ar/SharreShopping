namespace server.Services.Flipkart
{
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using StackExchange.Redis;
    using Microsoft.Extensions.DependencyInjection;
    using System.Security.Claims;

    using Models;
    using Models.Flipkart;
    using Account;

    internal class FlipkartWishlistService : FlipkartService
    {
        private const string productApi = "https://affiliate-api.flipkart.net/affiliate/product/json?id=";
        private readonly IServiceProvider serviceProvider;

        internal FlipkartWishlistService(
            IHttpService httpService, 
            ShoppingSiteConfig config,
            IServiceProvider serviceProvider) : base(httpService, config)
        {
            this.serviceProvider = serviceProvider;
        }

        internal async Task<FlipkartProduct> Get(string id)
        {
            return await httpService.Get<FlipkartProduct>(
                string.Concat(productApi, id),
                GetHeaders(),
                ConvertFlipkartProduct);
        }

        internal async Task<List<string>> Get(ClaimsIdentity identity)
        {
            IConnectionMultiplexer redis = serviceProvider.GetService<IConnectionMultiplexer>();
            IDatabase db = redis.GetDatabase();
            AccountService accountService = new AccountService();

            string email = accountService.GetLoginEmail(identity);

            var values = db.SetMembers(string.Concat("wishlist:", email, ":", "flipkart"));

            return await Task.FromResult<List<string>>(new List<string>(values.ToStringArray()));
        }
    }
}

namespace server.Services.Ebay
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Security.Claims;
    using StackExchange.Redis;
    using Microsoft.Extensions.DependencyInjection;

    using Account;

    internal class EbayService
    {
        private readonly IServiceProvider serviceProvider;

        internal EbayService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        internal async Task<List<string>> Get(ClaimsIdentity identity)
        {
            IConnectionMultiplexer redis = serviceProvider.GetService<IConnectionMultiplexer>();
            IDatabase db = redis.GetDatabase();
            AccountService accountService = new AccountService();

            string email = accountService.GetLoginEmail(identity);

            var values = db.SetMembers(string.Concat("wishlist:", email, ":", "ebay"));

            return await Task.FromResult<List<string>>(new List<string>(values.ToStringArray()));
        }
    }
}

namespace server.Services.Account
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using Microsoft.Extensions.DependencyInjection;
    using StackExchange.Redis;
    using System.Threading.Tasks;

    public class PreferenceService
    {
        private readonly IServiceProvider serviceProvider;

        private string GetEmail(ClaimsIdentity identity)
        {
            AccountService accountService = new AccountService();

            return accountService.GetLoginEmail(identity);
        }

        public PreferenceService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public void Save(ClaimsIdentity identity, string[] words)
        {
            Lazy<IConnectionMultiplexer> redis = serviceProvider.GetService<Lazy<IConnectionMultiplexer>>();
            IDatabase db = redis.Value.GetDatabase();

            db.SetAdd(string.Concat("preference:", GetEmail(identity)), words.Select(key => (RedisValue)key).ToArray());
        }

        public async Task<List<string>> Get(ClaimsIdentity identity)
        {
            Lazy<IConnectionMultiplexer> redis = serviceProvider.GetService<Lazy<IConnectionMultiplexer>>();
            IDatabase db = redis.Value.GetDatabase();

            return await Task.FromResult<List<string>>(new List<string>(
                db.SetMembers(string.Concat("preference:", GetEmail(identity))).ToStringArray()));
        }
    }
}

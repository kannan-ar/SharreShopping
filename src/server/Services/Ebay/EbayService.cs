namespace server.Services.Ebay
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Security.Claims;
    using StackExchange.Redis;
    using Microsoft.Extensions.DependencyInjection;
    using Newtonsoft.Json;

    using Account;
    using server.Models.Ebay;

    internal class EbayService
    {
        private const string getSingleItem = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=ShareSho-7fbb-407c-8989-2000fa0722c4&siteid=203&version=967&ItemID={0}&IncludeSelector=Details";

        private readonly IServiceProvider serviceProvider;
        private readonly IHttpService httpService;

        internal EbayService(IServiceProvider serviceProvider, IHttpService httpService)
        {
            this.serviceProvider = serviceProvider;
            this.httpService = httpService;
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

        internal async Task<EbayProduct> Get(string productId)
        {
            EbayItem item = await httpService.Get<EbayItem>(
                string.Format(getSingleItem, productId), null,
                (content) => { return JsonConvert.DeserializeObject<EbayItem>(content); });

            EbayProduct product = new EbayProduct();

            product.Condition = item?.Item?.ConditionDisplayName;
            product.GalleryURL = item?.Item?.GalleryURL;
            product.ItemId = item?.Item?.ItemId;
            product.Location = item?.Item?.Location;
            product.PaymentMethod = item?.Item?.PaymentMethods?[0];
            product.CategoryName = item?.Item?.PrimaryCategoryName;
            product.CurrencyId = item?.Item?.CurrentPrice?.CurrencyId;
            product.CurrentPrice = item?.Item?.CurrentPrice?.Value;
            product.Title = item?.Item?.Title;
            product.Subtitle = item?.Item?.Subtitle;
            product.ViewItemURL = item?.Item?.ViewItemURLForNaturalSearch;

            return await Task.FromResult<EbayProduct>(product);
        }
    }
}

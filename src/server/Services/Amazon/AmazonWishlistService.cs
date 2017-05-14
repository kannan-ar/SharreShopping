namespace server.Services.Amazon
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.IO;
    using System.Xml.Serialization;
    using System.Security.Claims;
    using StackExchange.Redis;
    using Microsoft.Extensions.DependencyInjection;

    using Models.Amazon;
    using Account;

    internal class AmazonWishlistService
    {
        private const int maxCount = 2;

        private readonly IAmazonService service;
        private string[] asinIds;

        private AmazonWishlistItems ConvertAmazonWishlist(string content)
        {
            AmazonWishlistItems result = new AmazonWishlistItems();

            using (StringReader sr = new StringReader(content))
            {
                XmlSerializer ser = new XmlSerializer(typeof(ItemLookupResponse));

                ItemLookupResponse data = (ItemLookupResponse)ser.Deserialize(sr);

                if (data == null || data.Items == null || data.Items.Length == 0)
                {
                    return result;
                }

                if (asinIds.Length > 0)
                {
                    result.Ids = asinIds;
                }

                foreach (Item item in data.Items)
                {
                    result.Items.Add(service.ConvertAmazonProduct(item));
                }
            }

            return result;
        }

        internal AmazonWishlistService(IAmazonService service)
        {
            if (service == null)
            {
                throw new ArgumentNullException("IAmazonService");
            }

            this.service = service;
        }

        internal async Task<AmazonWishlistItems> GetWishlistItems(string[] asins)
        {
            if (asins.Length == 0)
            {
                return await Task.FromResult<AmazonWishlistItems>(new AmazonWishlistItems());
            }

            string itemIds = string.Empty;

            if (asins.Length > maxCount)
            {
                itemIds = string.Join(",", asins, 0, maxCount);
                int remainingCount = asins.Length - maxCount;

                asinIds = new string[remainingCount];
                Array.Copy(asins, maxCount, asinIds, 0, remainingCount);
            }
            else
            {
                itemIds = string.Join(",", asins);
                asinIds = new string[0];
            }

            string url = service.GetSignedUrl("ItemLookup", (dict) =>
            {
                dict.Add("ItemId", itemIds);
            });

            return await service.HttpService.Get<AmazonWishlistItems>(url, null, ConvertAmazonWishlist);
        }

        internal async Task<AmazonWishlistItems> GetWishlistItems(IServiceProvider serviceProvider, ClaimsIdentity identity)
        {
            IConnectionMultiplexer redis = serviceProvider.GetService<IConnectionMultiplexer>();
            IDatabase db = redis.GetDatabase();
            string email = new AccountService().GetLoginEmail(identity);
            string[] asins = db.SetMembers(string.Concat("wishlist:", email, ":", "amazon")).ToStringArray();

            return await GetWishlistItems(asins);
        }
    }
}

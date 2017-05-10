namespace server.Services.Amazon
{
    using System;
    using System.Collections.Generic;
    using System.Xml.Serialization;
    using System.IO;
    using System.Threading.Tasks;
    using System.Security.Claims;
    using StackExchange.Redis;
    using Microsoft.Extensions.DependencyInjection;

    using Models;
    using Models.Amazon;
    using Account;

    internal class AmazonService
    {
        private const string endPoint = "webservices.amazon.in";
        private readonly ShoppingSiteConfig config;
        private readonly IHttpService httpService;

        internal enum Operations
        {
            ItemSearch,
            ItemLookup
        }

        private AmazonProduct ConvertAmazonProduct(Item item)
        {
            AmazonProduct amazonProduct = new AmazonProduct();

            amazonProduct.ASIN = item.ASIN;
            amazonProduct.Url = item.DetailPageURL;
            amazonProduct.ImageUrl = item.SmallImage?.URL;
            amazonProduct.Title = item.ItemAttributes?.Title;
            amazonProduct.FormattedPrice = item.ItemAttributes?.ListPrice?.FormattedPrice;

            return amazonProduct;
        }

        private List<AmazonProduct> ConvertAmazonSearch(string content)
        {
            List<AmazonProduct> list = new List<AmazonProduct>();

            using (StringReader sr = new StringReader(content))
            {
                XmlSerializer ser = new XmlSerializer(typeof(ItemSearchResponse));

                ItemSearchResponse data = (ItemSearchResponse)ser.Deserialize(sr);

                if (data == null || data.Items == null || data.Items.Length == 0)
                {
                    return list;
                }

                foreach (Item item in data.Items)
                {
                    list.Add(ConvertAmazonProduct(item));
                }
            }

            return list;
        }

        private List<AmazonProduct> ConvertAmazonLookup(string content)
        {
            List<AmazonProduct> list = new List<AmazonProduct>();

            using (StringReader sr = new StringReader(content))
            {
                XmlSerializer ser = new XmlSerializer(typeof(ItemLookupResponse));

                ItemLookupResponse data = (ItemLookupResponse)ser.Deserialize(sr);

                if (data == null || data.Items == null || data.Items.Length == 0)
                {
                    return list;
                }

                foreach (Item item in data.Items)
                {
                    list.Add(ConvertAmazonProduct(item));
                }
            }

            return list;
        }

        private string GetSignedUrl(string operation, Action<IDictionary<string, string>> beforeSignUrl)
        {
            var request = new SignedRequestHelper(config.Amazon.AmazonAccessKeyID, config.Amazon.AmazonSecretAccessKey, endPoint);

            IDictionary<string, string> dict = new Dictionary<string, string>();

            dict.Add("Service", "AWSECommerceService");
            dict.Add("Operation", operation);
            dict.Add("AWSAccessKeyId", config.Amazon.AmazonAccessKeyID);
            dict.Add("AssociateTag", config.Amazon.AssociateTag);
            dict.Add("ResponseGroup", "Images,ItemAttributes,Offers");

            beforeSignUrl(dict);



            return request.Sign(dict);
        }

        private async Task<List<AmazonProduct>> GetList(string operation, Action<IDictionary<string, string>> beforeSignUrl, Func<string, List<AmazonProduct>> convertor)
        {
            string url = GetSignedUrl(operation, beforeSignUrl);

            return await httpService.Get<List<AmazonProduct>>(url, null, convertor);
        }

        internal AmazonService(IHttpService httpService, ShoppingSiteConfig config)
        {
            this.config = config;
            this.httpService = httpService;
        }

        internal async Task<List<AmazonProduct>> Search(string query)
        {
            return await GetList(Operations.ItemSearch.ToString(), (dict) =>
            {
                dict.Add("SearchIndex", "All");
                dict.Add("Keywords", query);
            }, ConvertAmazonSearch);
        }

        internal async Task<List<AmazonProduct>> GetWishlistItems(IServiceProvider serviceProvider, ClaimsIdentity identity)
        {
            IConnectionMultiplexer redis = serviceProvider.GetService<IConnectionMultiplexer>();
            IDatabase db = redis.GetDatabase();
            string email = new AccountService().GetLoginEmail(identity);
            string[] asins = db.SetMembers(string.Concat("wishlist:", email, ":", "amazon")).ToStringArray();

            return await GetList(Operations.ItemLookup.ToString(), (dict) =>
            {
                dict.Add("ItemId", string.Join(",", asins));
            }, ConvertAmazonLookup);
        }
    }
}

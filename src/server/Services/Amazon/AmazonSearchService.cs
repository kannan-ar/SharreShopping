namespace server.Services.Amazon
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.IO;
    using System.Xml.Serialization;

    using Models;
    using Models.Amazon;

    internal sealed class AmazonSearchService
    {
        private const string endPoint = "webservices.amazon.in";
        private readonly ShoppingSiteConfig config;
        private readonly IHttpService httpService;

        private string GetSignedUrl(string keyword)
        {
            var request = new SignedRequestHelper(config.Amazon.AmazonAccessKeyID, config.Amazon.AmazonSecretAccessKey, endPoint);

            IDictionary<string, string> dict = new Dictionary<string, string>();

            dict.Add("Service", "AWSECommerceService");
            dict.Add("Operation", "ItemSearch");
            dict.Add("AWSAccessKeyId", config.Amazon.AmazonAccessKeyID);
            dict.Add("AssociateTag", config.Amazon.AssociateTag);
            dict.Add("SearchIndex", "All");
            dict.Add("ResponseGroup", "Images,ItemAttributes,Offers");
            dict.Add("Keywords", keyword);

            return request.Sign(dict);
        }

        private List<AmazonSearch> ConvertAmazonSearch(string content)
        {
            List<AmazonSearch> list = new List<AmazonSearch>();

            using (StringReader sr = new StringReader(content))
            {
                XmlSerializer ser = new XmlSerializer(typeof(ItemSearchResponse));

                ItemSearchResponse data = (ItemSearchResponse)ser.Deserialize(sr);

                if (data == null || data.Items == null || data.Items.Length == 0)
                {
                    return list;
                }

                foreach(Item item in data.Items)
                {
                    AmazonSearch amazonSearch = new AmazonSearch();

                    amazonSearch.ASIN = item.ASIN;
                    amazonSearch.Url = item.DetailPageURL;
                    amazonSearch.ImageUrl = item.SmallImage?.URL;
                    amazonSearch.Title = item.ItemAttributes?.Title;
                    amazonSearch.FormattedPrice = item.ItemAttributes?.ListPrice?.FormattedPrice;

                    list.Add(amazonSearch);
                }
            }

            return list;
        }

        internal AmazonSearchService(ShoppingSiteConfig config, IHttpService httpService)
        {
            this.config = config;
            this.httpService = httpService;
        }

        internal async Task<List<AmazonSearch>> Search(string query)
        {
            string url = GetSignedUrl(query);

            return await httpService.Get<List<AmazonSearch>>(url, null, ConvertAmazonSearch);
        }
    }
}

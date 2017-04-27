namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    using Models;
    using Models.Flipkart;

    internal class FlipkartSearchService : FlipkartService
    {
        private const string SearchApi = "https://affiliate-api.flipkart.net/affiliate/search/json?query={0}&resultCount={1}";
        private const int SearchApiCount = 10;

        private List<FlipkartProduct> ConvertFlipkartSearch(string content)
        {
            dynamic items = JsonConvert.DeserializeObject(content);

            List<FlipkartProduct> list = new List<FlipkartProduct>();

            foreach (var item in items.productInfoList)
            {
                list.Add(ConvertFlipkartProduct(item));
            }

            return list;
        }

        internal FlipkartSearchService(IHttpService httpService, ShoppingSiteConfig config) : base(httpService, config) { }

        internal async Task<List<FlipkartProduct>> Search(string query)
        {
            return await httpService.Get<List<FlipkartProduct>>(
                string.Format(SearchApi, query, SearchApiCount.ToString()),
                GetHeaders(),
                ConvertFlipkartSearch);
        }
    }
}

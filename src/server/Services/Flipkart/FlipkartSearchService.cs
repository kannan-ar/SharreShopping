namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using server.Models.Flipkart;
    using Newtonsoft.Json;

    internal class FlipkartSearchService : FlipkartService
    {
        private const string SearchApi = "https://affiliate-api.flipkart.net/affiliate/search/json?query={0}&resultCount={1}";
        private const string SearchCacheKey = "flipkartsearch";
        private const int SearchApiCount = 10;

        private List<FlipkartSearch> ConvertFlipkartSearch(string content)
        {
            dynamic items = JsonConvert.DeserializeObject(content);

            List<FlipkartSearch> list = new List<FlipkartSearch>();

            foreach (var item in items.productInfoList)
            {
                string imgUrl = string.Empty;
                var imageUrls = item?.productBaseInfo?.productAttributes?.imageUrls;

                if (imageUrls != null)
                {
                    foreach (var img in item?.productBaseInfo?.productAttributes?.imageUrls)
                    {
                        if (img.Name == "200x200")
                        {
                            imgUrl = img.Value;
                            break;
                        }
                    }
                }

                list.Add(new FlipkartSearch()
                {
                    ProductId = item?.productBaseInfo?.productIdentifier?.productId,
                    Title = item?.productBaseInfo?.productAttributes?.title,
                    ImageUrl = imgUrl,
                    MRPAmount = item?.productBaseInfo?.productAttributes?.maximumRetailPrice?.amount,
                    MRPCurrency = item?.productBaseInfo?.productAttributes?.maximumRetailPrice?.currency,
                    SellingAmount = item?.productBaseInfo?.productAttributes?.sellingPrice?.amount,
                    SellingCurrency = item?.productBaseInfo?.productAttributes?.sellingPrice?.currency,
                    ProductUrl = item?.productBaseInfo?.productAttributes?.productUrl,
                    InStock = item?.productBaseInfo?.productAttributes?.inStock,
                    IsAvailable = item?.productBaseInfo?.productAttributes?.isAvailable,
                    DiscountPercentage = item?.productBaseInfo?.productAttributes?.discountPercentage
                });
            }

            return list;
        }

        internal FlipkartSearchService(IHttpService httpService) : base(httpService) { }

        internal async Task<List<FlipkartSearch>> Search(string query, int currentIndex, int itemCount)
        {
            List<FlipkartSearch> list = await httpService.Get<List<FlipkartSearch>>(SearchCacheKey,
                string.Format(SearchApi, query, SearchApiCount.ToString()), GetHeaders(), ConvertFlipkartSearch);

            return list.Skip(currentIndex * itemCount).Take(itemCount).ToList();
        }
    }
}

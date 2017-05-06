namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;

    using Models;
    using Models.Flipkart;

    internal class FlipkartOfferService : FlipkartService
    {
        private const string OffersApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
        private const string OfferCacheKey = "flipkartoffer";

        internal FlipkartOfferService(IHttpService httpService, ShoppingSiteConfig config): base(httpService, config) { }

        internal async Task<List<FlipkartOfferItem>> GetOffers(int currentIndex, int itemCount)
        {
            FlipkartOfferList list = await httpService.Get<FlipkartOfferList>(OfferCacheKey, OffersApi, GetHeaders());
            return list.Offers.Skip(currentIndex).Take(itemCount).ToList();
        }
    }
}

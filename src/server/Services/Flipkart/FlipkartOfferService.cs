namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using server.Models.Flipkart;
    using Microsoft.Extensions.Configuration;

    internal class FlipkartOfferService : FlipkartService
    {
        private const string OffersApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
        private const string OfferCacheKey = "flipkartoffer";

        internal FlipkartOfferService(IHttpService httpService, IConfiguration configuration): base(httpService, configuration) { }

        internal async Task<List<FlipkartOfferItem>> GetOffers(int currentIndex, int itemCount)
        {
            FlipkartOfferList list = await httpService.Get<FlipkartOfferList>(OfferCacheKey, OffersApi, GetHeaders());
            return list.Offers.Skip((currentIndex) * itemCount).Take(itemCount).ToList();
        }
    }
}

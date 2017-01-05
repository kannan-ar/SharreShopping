namespace server.Services.Flipkart
{
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;
        using server.Models.Flipkart;
        internal class FlipkartService
        {
                private const string TokenId = "sharresho";
                private const string Token = "6b86ac4333934f06ba0d17458382ba99";

                private const string DealOfDayApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";
                private const string DealOfDayCacheKey = "flipkartdealofday";
                
                private const string OffersApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
                private const string OfferCacheKey = "flipkartoffer";
                
                private readonly IShoppingService service;

                private Dictionary<string, string> GetHeaders()
                {
                        Dictionary<string, string> headers = new Dictionary<string, string>();

                        headers.Add("Fk-Affiliate-Id", TokenId);
                        headers.Add("Fk-Affiliate-Token", Token);

                        return headers;
                }
                internal FlipkartService(IShoppingService service)
                {
                        this.service = service;
                }

                public async Task<List<FlipkartDealOfDayItem>> GetDealOfDay(int currentIndex, int itemCount)
                {
                        FlipkartDealOfDayList list =  await service.Get<FlipkartDealOfDayList>(DealOfDayCacheKey, DealOfDayApi, GetHeaders());
                       return list.DealOfDay.Skip((currentIndex) * itemCount).Take(itemCount).ToList();
                }

                public async Task<List<FlipkartOfferItem>> GetOffers(int currentIndex, int itemCount)
                {
                        FlipkartOfferList list =  await service.Get<FlipkartOfferList>(OfferCacheKey, OffersApi, GetHeaders());
                       return list.Offers.Skip((currentIndex) * itemCount).Take(itemCount).ToList();
                }
        }
}
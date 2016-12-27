namespace server.Services.Flipkart
{
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;
        using server.Models.Flipkart;
        internal class FlipkartService
        {
                private const string DealOfDayCacheKey = "flipkartdealofday";
                private const string TokenId = "sharresho";
                private const string Token = "6b86ac4333934f06ba0d17458382ba99";
                private const string DealOfDayApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";
                private const string OffersApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
                private readonly IShoppingService service;
                internal FlipkartService(IShoppingService service)
                {
                        this.service = service;
                }

                public async Task<List<FlipkartDealOfDayItem>> GetDealOfDay(int pageNumber, int itemCount)
                {
                        Dictionary<string, string> headers = new Dictionary<string, string>();

                        headers.Add("Fk-Affiliate-Id", TokenId);
                        headers.Add("Fk-Affiliate-Token", Token);
                        
                                                      
                        FlipkartDealOfDayList list =  await service.Get<FlipkartDealOfDayList>(DealOfDayCacheKey, DealOfDayApi, headers);
                       return list.DealOfDay.Skip((pageNumber - 1) * itemCount).Take(itemCount).ToList();
                }
        }
}
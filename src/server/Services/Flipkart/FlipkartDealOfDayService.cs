namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using server.Models.Flipkart;
    using Microsoft.Extensions.Configuration;

    internal class FlipkartDealOfDayService : FlipkartService
    {
        private const string DealOfDayApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";
        private const string DealOfDayCacheKey = "flipkartdealofday";

        internal FlipkartDealOfDayService(IHttpService httpService, IConfiguration configuration) : base(httpService, configuration) { }

        public async Task<List<FlipkartDealOfDayItem>> GetDealOfDay(int currentIndex, int itemCount)
        {
            FlipkartDealOfDayList list = await httpService.Get<FlipkartDealOfDayList>(DealOfDayCacheKey, DealOfDayApi, GetHeaders());
            var items = list.DealOfDay.Where(d => d.ImageUrls.Where(i => !string.IsNullOrEmpty(i.Url)).Any());
            return items.Skip((currentIndex) * itemCount).Take(itemCount).ToList();
        }

    }
}

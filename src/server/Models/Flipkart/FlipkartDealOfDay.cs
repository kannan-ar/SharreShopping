namespace server.Models.Flipkart
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public sealed class FlipkartDealOfDayItem
    {
        [JsonProperty("availability")]
        public string Availability { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrls")]
        public List<FlipkartImage> ImageUrls { get; set; }

        public string Title { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class FlipkartDealOfDayList
    {
        [JsonProperty("dotdList")]
        public List<FlipkartDealOfDayItem> DealOfDay { get; set; }
    }
}
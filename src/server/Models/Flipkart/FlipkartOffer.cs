namespace server.Models.Flipkart
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public sealed class FlipkartOfferItem
    {
        [JsonProperty("availability")]
        public string Availability { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrls")]
        public List<FlipkartImage> ImageUrls { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("startTime")]
        public Int64 StartTime { get; set; }

        [JsonIgnore]
        public string Start
        {
            get
            {
                return ModelUtility.GetDateTimeFromUnixTime(StartTime).ToString(ModelUtility.DateFormat);
            }
        }

        [JsonProperty("endTime")]
        public Int64 EndTime { get; set; }

        [JsonIgnore]
        public string End
        {
            get
            {
                return ModelUtility.GetDateTimeFromUnixTime(EndTime).ToString(ModelUtility.DateFormat);
            }
        }

        [JsonProperty("category")]
        public string Category { get; set; }
    }

    public class FlipkartOfferList
    {
        [JsonProperty("allOffersList")]
        public List<FlipkartOfferItem> Offers { get; set; }
    }
}
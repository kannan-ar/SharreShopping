namespace server.Models.Flipkart
{
    using Newtonsoft.Json;

    public sealed class FlipkartImage
    {
        [JsonProperty("resolutionType")]
        public string ResolutionType { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
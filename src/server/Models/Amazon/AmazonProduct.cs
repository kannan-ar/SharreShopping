namespace server.Models.Amazon
{
    internal class AmazonProduct
    {
        public string ASIN { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Url { get; set; }
        public string FormattedPrice { get; set; }
        public string Description { get; set; }
    }
}

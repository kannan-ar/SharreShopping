namespace server.Models.Flipkart
{
    internal class FlipkartProduct
    {
        public string ProductId { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string MRPAmount { get; set; }
        public string MRPCurrency { get; set; }
        public string SellingAmount { get; set; }
        public string SellingCurrency { get; set; }
        public string ProductUrl { get; set; }
        public bool? InStock { get; set; }
        public bool? IsAvailable { get; set; }
        public decimal? DiscountPercentage { get; set; }
    }

}

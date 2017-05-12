namespace server.Models.Ebay
{
    public class Price
    {
        public string CurrencyId { get; set; }
        public string Value { get; set; }
    }

    public class Item
    {
        public string ConditionDisplayName { get; set; }
        public string GalleryURL { get; set; }
        public string ItemId { get; set; }
        public string Location { get; set; }
        public string[] PaymentMethods { get; set; }
        public string PrimaryCategoryName { get; set; }
        public Price CurrentPrice { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string ViewItemURLForNaturalSearch { get; set; }
    }

    public class EbayItem
    {
        public Item Item { get; set; }
    }

    public class EbayProduct
    {
        public string Condition { get; set; }
        public string GalleryURL { get; set; }
        public string ItemId { get; set; }
        public string Location { get; set; }
        public string PaymentMethod { get; set; }
        public string CategoryName { get; set; }
        public string CurrencyId { get; set; }
        public string CurrentPrice { get; set; }
        public string SellingState { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string ViewItemURL { get; set; }
    }
}

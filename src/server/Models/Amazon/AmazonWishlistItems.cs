namespace server.Models.Amazon
{
    using System.Collections.Generic;

    internal class AmazonWishlistItems
    {
        public string[] Ids { get; set; }
        public List<AmazonProduct> Items { get; set; }

        internal AmazonWishlistItems()
        {
            Ids = new string[0];
            Items = new List<AmazonProduct>();
        }
    }
}

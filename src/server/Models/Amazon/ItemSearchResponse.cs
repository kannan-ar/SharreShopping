namespace server.Models.Amazon
{
    using System.Xml.Serialization;

    public class ListPrice
    {
        public string FormattedPrice { get; set; }
    }

    public class ItemAttribute
    {
        public string Title { get; set; }
        public ListPrice ListPrice { get; set; }
        [XmlElement("Feature")]
        public string[] Feature { get; set; }
    }

    public class Image
    {
        public string URL { get; set; }
    }

    public class Item
    {
        public string DetailPageURL { get; set; }
        public Image SmallImage { get; set; }
        public ItemAttribute ItemAttributes { get; set; }
    }

    [XmlRoot("ItemSearchResponse", Namespace = "http://webservices.amazon.com/AWSECommerceService/2011-08-01")]
    public class ItemSearchResponse
    {
        public Item[] Items { get; set; }
    }
}

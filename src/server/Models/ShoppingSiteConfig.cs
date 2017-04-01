namespace server.Models
{
    public class FlipkartConfig
    {
        public string FlipkartTokenId { get; set; }
        public string FlipkartToken { get; set; }
    }

    public class AmazonConfig
    {
        public string AmazonAccessKeyID { get; set; }
        public string AmazonSecretAccessKey { get; set; }
        public string AssociateTag { get; set; }
    }

    public class ShoppingSiteConfig
    {
        public FlipkartConfig Flipkart { get; set; }
        public AmazonConfig Amazon { get; set; }
    }
}

namespace server.Services.Amazon
{
    using System;
    using System.Collections.Generic;
    using System.Text;


    using Models;
    using Models.Amazon;

    internal class AmazonService : IAmazonService
    {
        private const string endPoint = "webservices.amazon.in";
        private readonly ShoppingSiteConfig config;
        private readonly IHttpService httpService;

        public IHttpService HttpService
        {
            get
            {
                return this.httpService;
            }
        }

        internal AmazonService(IHttpService httpService, ShoppingSiteConfig config)
        {
            this.config = config;
            this.httpService = httpService;
        }

        public AmazonProduct ConvertAmazonProduct(Item item)
        {
            AmazonProduct amazonProduct = new AmazonProduct();

            amazonProduct.ASIN = item.ASIN;
            amazonProduct.Url = item.DetailPageURL;
            amazonProduct.ImageUrl = item.SmallImage?.URL;
            amazonProduct.Title = item.ItemAttributes?.Title;
            amazonProduct.FormattedPrice = item.ItemAttributes?.ListPrice?.FormattedPrice;

            if (item.ItemAttributes != null && item.ItemAttributes.Feature != null && item.ItemAttributes.Feature.Length > 0)
            {
                StringBuilder sb = new StringBuilder();

                foreach(string feature in item.ItemAttributes.Feature)
                {
                    sb.AppendLine(feature + System.Environment.NewLine);
                }
                amazonProduct.Description = item.ItemAttributes.Feature[0];
            }

            return amazonProduct;
        }

        public string GetSignedUrl(string operation, Action<IDictionary<string, string>> beforeSignUrl)
        {
            var request = new SignedRequestHelper(config.Amazon.AmazonAccessKeyID, config.Amazon.AmazonSecretAccessKey, endPoint);

            IDictionary<string, string> dict = new Dictionary<string, string>();

            dict.Add("Service", "AWSECommerceService");
            dict.Add("Operation", operation);
            dict.Add("AWSAccessKeyId", config.Amazon.AmazonAccessKeyID);
            dict.Add("AssociateTag", config.Amazon.AssociateTag);
            dict.Add("ResponseGroup", "Images,ItemAttributes,Offers");

            beforeSignUrl(dict);

            return request.Sign(dict);
        }
    }
}

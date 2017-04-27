namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Models;
    using Models.Flipkart;

    internal abstract class FlipkartService
    {
        protected readonly IHttpService httpService;
        protected readonly ShoppingSiteConfig config;

        protected Dictionary<string, string> GetHeaders()
        {
            Dictionary<string, string> headers = new Dictionary<string, string>();

            headers.Add("Fk-Affiliate-Id", config.Flipkart.FlipkartTokenId);
            headers.Add("Fk-Affiliate-Token", config.Flipkart.FlipkartToken);

            return headers;
        }

        protected FlipkartProduct ConvertFlipkartProduct(dynamic item)
        {
            string imgUrl = string.Empty;
            var imageUrls = item?.productBaseInfo?.productAttributes?.imageUrls;

            if (imageUrls != null)
            {
                foreach (var img in item?.productBaseInfo?.productAttributes?.imageUrls)
                {
                    if (img.Name == "200x200")
                    {
                        imgUrl = img.Value;
                        break;
                    }
                }
            }

            return new FlipkartProduct()
            {
                ProductId = item?.productBaseInfo?.productIdentifier?.productId,
                Title = item?.productBaseInfo?.productAttributes?.title,
                ImageUrl = imgUrl,
                MRPAmount = item?.productBaseInfo?.productAttributes?.maximumRetailPrice?.amount,
                MRPCurrency = item?.productBaseInfo?.productAttributes?.maximumRetailPrice?.currency,
                SellingAmount = item?.productBaseInfo?.productAttributes?.sellingPrice?.amount,
                SellingCurrency = item?.productBaseInfo?.productAttributes?.sellingPrice?.currency,
                ProductUrl = item?.productBaseInfo?.productAttributes?.productUrl,
                InStock = item?.productBaseInfo?.productAttributes?.inStock,
                IsAvailable = item?.productBaseInfo?.productAttributes?.isAvailable,
                DiscountPercentage = item?.productBaseInfo?.productAttributes?.discountPercentage
            };
        }

        internal FlipkartService(IHttpService httpService, ShoppingSiteConfig config)
        {
            this.httpService = httpService;
            this.config = config;
        }
    }
}
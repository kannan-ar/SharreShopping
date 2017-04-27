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
            var imageUrls = item?.productBaseInfoV1?.imageUrls;

            if (imageUrls != null)
            {
                foreach (var img in imageUrls)
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
                ProductId = item?.productBaseInfoV1?.productId,
                Title = item?.productBaseInfoV1?.title,
                ImageUrl = imgUrl,
                MRPAmount = item?.productBaseInfoV1?.maximumRetailPrice?.amount,
                MRPCurrency = item?.productBaseInfoV1?.maximumRetailPrice?.currency,
                SellingAmount = item?.productBaseInfoV1?.flipkartSellingPrice?.amount,
                SellingCurrency = item?.productBaseInfoV1?.flipkartSellingPrice?.currency,
                ProductUrl = item?.productBaseInfoV1?.productUrl,
                InStock = item?.productBaseInfoV1?.inStock,
                IsAvailable = item?.productBaseInfoV1?.codAvailable,
                DiscountPercentage = item?.productBaseInfoV1?.discountPercentage
            };
        }

        internal FlipkartService(IHttpService httpService, ShoppingSiteConfig config)
        {
            this.httpService = httpService;
            this.config = config;
        }
    }
}
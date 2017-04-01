namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using Microsoft.Extensions.Configuration;

    using Models;

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

        internal FlipkartService(IHttpService httpService, ShoppingSiteConfig config)
        {
            this.httpService = httpService;
            this.config = config;
        }
    }
}
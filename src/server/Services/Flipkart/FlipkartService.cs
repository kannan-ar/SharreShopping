namespace server.Services.Flipkart
{
    using System.Collections.Generic;
    using Microsoft.Extensions.Configuration;

    internal abstract class FlipkartService
    {
        protected readonly IHttpService httpService;
        protected readonly IConfiguration configuration;

        protected Dictionary<string, string> GetHeaders()
        {
            Dictionary<string, string> headers = new Dictionary<string, string>();
            
            headers.Add("Fk-Affiliate-Id", configuration["FlipkartTokenId"]);
            headers.Add("Fk-Affiliate-Token", configuration["FlipkartToken"]);

            return headers;
        }

        internal FlipkartService(IHttpService httpService, IConfiguration configuration)
        {
            this.httpService = httpService;
            this.configuration = configuration;
        }
    }
}
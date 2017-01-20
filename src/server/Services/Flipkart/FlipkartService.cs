namespace server.Services.Flipkart
{
    using System.Collections.Generic;

    internal abstract class FlipkartService
    {
        private const string TokenId = "sharresho";
        private const string Token = "6b86ac4333934f06ba0d17458382ba99";

        protected readonly IHttpService httpService;

        protected Dictionary<string, string> GetHeaders()
        {
            Dictionary<string, string> headers = new Dictionary<string, string>();

            headers.Add("Fk-Affiliate-Id", TokenId);
            headers.Add("Fk-Affiliate-Token", Token);

            return headers;
        }

        internal FlipkartService(IHttpService httpService)
        {
            this.httpService = httpService;
        }
    }
}
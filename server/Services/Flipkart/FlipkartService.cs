namespace server.Services.Flipkart
{
        using System.Collections.Generic;
        internal class FlipkartService
        {
                public const string TokenId = "sharresho";
                public const string Token = "6b86ac4333934f06ba0d17458382ba99";
                public const string DealOfDayApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";
                public const string OffersApi = "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
                public static Dictionary<string, string> DefaultHeaders;

                static FlipkartService()
                {
                        DefaultHeaders = new Dictionary<string, string>();
                        
                        DefaultHeaders.Add("Fk-Affiliate-Id", TokenId);
                        DefaultHeaders.Add("Fk-Affiliate-Token", Token);
                }
        }
}
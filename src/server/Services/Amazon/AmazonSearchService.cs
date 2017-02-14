namespace server.Services.Amazon
{
    using Microsoft.Extensions.Configuration;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    internal sealed class AmazonSearchService
    {
        private const string endPoint = "webservices.amazon.in";
        private readonly IConfiguration configuration;

        internal AmazonSearchService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        internal string GetSignedUrl(string keyword)
        {
            var request = new SignedRequestHelper(configuration["AmazonAccessKeyID"], configuration["AmazonSecretAccessKey"], endPoint);

            IDictionary <string, string> dict = new Dictionary<string, string>();

            dict.Add("Service", "AWSECommerceService");
            dict.Add("Operation", "ItemSearch");
            dict.Add("AWSAccessKeyId", configuration["AmazonAccessKeyID"]);
            dict.Add("AssociateTag", configuration["AmazonAssociateTag"]);
            dict.Add("SearchIndex", "All");
            dict.Add("ResponseGroup", "Images,ItemAttributes,Offers");
            dict.Add("Keywords", keyword);
            dict.Add("callback", "JSONP_CALLBACK");

            return request.Sign(dict);
        }
    }
}

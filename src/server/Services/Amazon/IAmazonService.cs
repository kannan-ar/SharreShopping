namespace server.Services.Amazon
{
    using System;
    using System.Collections.Generic;

    using Models.Amazon;

    internal interface IAmazonService
    {
        IHttpService HttpService { get; }
        AmazonProduct ConvertAmazonProduct(Item item);
        string GetSignedUrl(string operation, Action<IDictionary<string, string>> beforeSignUrl);
    }
}

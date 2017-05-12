namespace server.Services.Amazon
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.IO;
    using System.Xml.Serialization;

    using Models.Amazon;
    
    internal class AmazonProductService
    {
        private readonly IAmazonService service;

        private List<AmazonProduct> ConvertAmazonSearch(string content)
        {
            List<AmazonProduct> list = new List<AmazonProduct>();

            using (StringReader sr = new StringReader(content))
            {
                XmlSerializer ser = new XmlSerializer(typeof(ItemSearchResponse));

                ItemSearchResponse data = (ItemSearchResponse)ser.Deserialize(sr);

                if (data == null || data.Items == null || data.Items.Length == 0)
                {
                    return list;
                }

                foreach (Item item in data.Items)
                {
                    list.Add(service.ConvertAmazonProduct(item));
                }
            }

            return list;
        }

        internal AmazonProductService(IAmazonService service)
        {
            if (service == null)
            {
                throw new ArgumentNullException("IAmazonService");
            }

            this.service = service;
        }

        internal async Task<List<AmazonProduct>> Search(string query)
        {
            string url = service.GetSignedUrl("ItemSearch", (dict) =>
            {
                dict.Add("SearchIndex", "All");
                dict.Add("Keywords", query);
            });

            return await service.HttpService.Get<List<AmazonProduct>>(url, null, ConvertAmazonSearch);
        }
    }
}

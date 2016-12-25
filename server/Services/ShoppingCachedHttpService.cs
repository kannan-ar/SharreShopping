namespace server.Services
{
        using System.Collections.Generic;
        using System.Net.Http;
        using System.Threading.Tasks;
        internal class ShoppingCachedHttpService : IShoppingService
        {
                public async Task<string> Get(string url, Dictionary<string, string> headers = null)
                {
                        using (var client = new HttpClient())
                        {
                                if (headers != null)
                                {
                                        foreach (var header in headers)
                                        {
                                                client.DefaultRequestHeaders.Add(header.Key, header.Value);
                                        }
                                }

                                using (var response = await client.GetAsync(url))
                                {
                                        return await response.Content.ReadAsStringAsync();
                                }
                        }
                }
        }
}
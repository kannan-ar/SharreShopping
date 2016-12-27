namespace server.Services
{
        using System.Collections.Generic;
        using System.Net.Http;
        using Microsoft.Extensions.Caching.Memory;
        using System.Threading.Tasks;
        using Newtonsoft.Json;
        public class ShoppingCachedHttpService : IShoppingService
        {
                private IMemoryCache memoryCache;

                private async Task<string> DownloadData(string url, Dictionary<string, string> headers = null)
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

                private async Task<T> GetSource<T>(string cacheKey, string url, Dictionary<string, string> headers = null)
                {
                        T item = default(T);

                        string content = await DownloadData(url, headers);
                        item = JsonConvert.DeserializeObject<T>(content);
                        memoryCache.Set<T>(cacheKey, item);

                        return item;
                }
                public ShoppingCachedHttpService(IMemoryCache memoryCache)
                {
                        this.memoryCache = memoryCache;
                }
                public async Task<List<T>> GetList<T>(string cacheKey, string url, Dictionary<string, string> headers = null)
                {
                        object data;
                        List<T> list;

                        if (!memoryCache.TryGetValue(cacheKey, out data))
                        {
                                list = await GetSource<List<T>>(cacheKey, url, headers);
                        }
                        else
                        {
                                list = (List<T>)data;
                        }

                        return list;
                }

                public async Task<T> Get<T>(string cacheKey, string url, Dictionary<string, string> headers = null)
                {
                        object data;
                        T item = default(T);

                        if (!memoryCache.TryGetValue(cacheKey, out data))
                        {
                                item = await GetSource<T>(cacheKey, url, headers);
                        }
                        else
                        {
                                item = (T)data;
                        }

                        return item;
                }
        }
}
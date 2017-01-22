namespace server.Services
{
    using System;
    using System.Collections.Generic;
    using Microsoft.Extensions.Caching.Memory;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using System.Net.Http;

    internal class HttpService : IHttpService
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

        private async Task<T> GetSource<T>(string url, Dictionary<string, string> headers = null, Func<string, T> converter = null)
        {
            string content = await DownloadData(url, headers);
            return converter(content);
        }

        private async Task<T> GetSource<T>(string cacheKey, string url, Dictionary<string, string> headers = null, Func<string, T> converter = null)
        {
            T item = await GetSource<T>(url, headers, converter);
            memoryCache.Set<T>(cacheKey, item);
            return item;
        }

        public HttpService(IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache;
        }

        public async Task<T> Get<T>(string cacheKey, string url, Dictionary<string, string> headers = null, Func<string, T> converter = null)
        {
            object data;
            T item = default(T);

            if (!memoryCache.TryGetValue(cacheKey, out data))
            {
                if (converter == null)
                {
                    converter = (content) => { return JsonConvert.DeserializeObject<T>(content); };
                }

                item = await GetSource<T>(cacheKey, url, headers, converter);
            }
            else
            {
                item = (T)data;
            }

            return item;
        }

        public async Task<T> Get<T>(string url, Dictionary<string, string> headers = null, Func<string, T> converter = null)
        {
            if (converter == null)
            {
                converter = (content) => { return JsonConvert.DeserializeObject<T>(content); };
            }

            return await GetSource<T>(url, headers, converter);
        }
    }
}
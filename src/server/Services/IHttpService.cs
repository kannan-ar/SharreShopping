namespace server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IHttpService
    {
        Task<T> Get<T>(string cacheKey, string url, Dictionary<string, string> headers = null, Func<string, T> func = null);
    }
}
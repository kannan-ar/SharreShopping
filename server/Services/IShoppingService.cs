namespace server.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface IShoppingService
    {        
        Task<List<T>>  GetList<T>(string cacheKey, string url, Dictionary<string, string> headers = null);
        Task<T> Get<T>(string cacheKey, string url, Dictionary<string, string> headers = null);
    }
}
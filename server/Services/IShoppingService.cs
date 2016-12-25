namespace server.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface IShoppingService
    {        
        Task<string>  Get(string url, Dictionary<string, string> headers = null);        
    }
}
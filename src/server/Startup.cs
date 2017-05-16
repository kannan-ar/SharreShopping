namespace server
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using StackExchange.Redis;

    using Services;
    using Models;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ShoppingSiteConfig>(options => Configuration.GetSection("ShoppingSites").Bind(options));

            services.Configure<AuthConfig>(options =>
            {
                Configuration.GetSection("AuthSettings").Bind(options);
            });

            services.AddMvc();
            services.AddMemoryCache();

            services.AddTransient<IHttpService, HttpService>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSingleton<IConnectionMultiplexer>(
                ConnectionMultiplexer.Connect(Configuration["ExternalConnections:RedisConnection"]));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = "SharreShoppingCookieMiddleware"
            });

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Configuration["AuthSettings:Facebook:AppId"],
                AppSecret = Configuration["AuthSettings:Facebook:AppSecret"],
                SignInScheme = "SharreShoppingCookieMiddleware",
                Scope = { "email" }
            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Configuration["AuthSettings:Google:ClientId"],
                ClientSecret = Configuration["AuthSettings:Google:ClientSecret"],
                SignInScheme = "SharreShoppingCookieMiddleware",
                Scope = { "email", "openid" }
            });

            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}

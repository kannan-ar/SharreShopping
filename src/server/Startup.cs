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
    using Microsoft.AspNetCore.Authentication.Facebook;
    using System;

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
                builder.AddUserSecrets<Startup>();
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

            services.AddAuthentication(ShoppingContext.MiddlewareName)
                .AddCookie(ShoppingContext.MiddlewareName)
                .AddFacebook(options =>
                {
                    options.AppId = Configuration["AuthSettings:Facebook:AppId"];
                    options.AppSecret = Configuration["AuthSettings:Facebook:AppSecret"];
                    options.SignInScheme = ShoppingContext.MiddlewareName;
                    options.Scope.Add("email");
                    options.Scope.Add("publish_actions");
                    options.SaveTokens = true;
                })
                .AddGoogle(options =>
                {
                    options.ClientId = Configuration["AuthSettings:Google:ClientId"];
                    options.ClientSecret = Configuration["AuthSettings:Google:ClientSecret"];
                    options.SignInScheme = ShoppingContext.MiddlewareName;
                    options.Scope.Add("email");
                    options.Scope.Add("openid");
                    options.SaveTokens = true;
                });

            services.AddTransient<IHttpService, HttpService>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSingleton<Lazy<IConnectionMultiplexer>>(
                new Lazy<IConnectionMultiplexer>(() =>
                {
                    return ConnectionMultiplexer.Connect(Configuration["ExternalConnections:RedisConnection"]);
                }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            /*
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = "SharreShoppingCookieMiddleware",
            });

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Configuration["AuthSettings:Facebook:AppId"],
                AppSecret = Configuration["AuthSettings:Facebook:AppSecret"],
                SignInScheme = "SharreShoppingCookieMiddleware",
                Scope = { "email", "publish_actions" },
                SaveTokens = true
            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Configuration["AuthSettings:Google:ClientId"],
                ClientSecret = Configuration["AuthSettings:Google:ClientSecret"],
                SignInScheme = "SharreShoppingCookieMiddleware",
                Scope = { "email", "openid" },
                SaveTokens = true,
            });
            */
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });

            //app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}

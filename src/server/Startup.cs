namespace server
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using StackExchange.Redis;

    using Services;
    using Models;
    using System;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ShoppingSiteConfig>(options => Configuration.GetSection("ShoppingSites").Bind(options));

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.Configure<AuthConfig>(options =>
            {
                Configuration.GetSection("AuthSettings").Bind(options);
            });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });
        }
    }
}

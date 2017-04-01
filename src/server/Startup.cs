namespace server
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Services;
    using Models;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Text;

    public class Startup
    {
        private SymmetricSecurityKey symmetricKey;

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
            symmetricKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["AuthSettings:Jwt:SecurityKey"]));

            services.Configure<ShoppingSiteConfig>(options => Configuration.GetSection("ShoppingSites").Bind(options));
            services.Configure<AuthConfig>(options =>
            {
                options.SymmetricKey = symmetricKey;
                Configuration.GetSection("AuthSettings").Bind(options);
            });

            services.AddMvc();
            services.AddMemoryCache();

            services.AddTransient<IHttpService, HttpService>();
            services.AddSingleton<IConfiguration>(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            string s = Configuration["AuthSettings:Jwt:Issuer"];

            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = Configuration["AuthSettings:Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = Configuration["AuthSettings:Jwt:Audience"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = symmetricKey,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = "SharreShoppingCookieMiddleware",
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

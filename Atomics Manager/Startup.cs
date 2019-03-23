using AspNet.Security.OAuth.Validation;
using AspNet.Security.OpenIdConnect.Primitives;
using Atomics_Manager.Authorization;
using Atomics_Manager.Helpers;
using Atomics_Manager.Hubs;
using Atomics_Manager.ViewModels;
using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;
using Swashbuckle.AspNetCore.Swagger;
//using Swashbuckle.AspNetCore.Swagger;
namespace Atomics_Manager
{
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
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("Atomics Manager"));
                options.UseOpenIddict();

            }
                
                
                
                );

            services.AddIdentity<ApplicationUser, ApplicationRole>()
             .AddEntityFrameworkStores<ApplicationDbContext>()
             .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // User settings
                options.User.RequireUniqueEmail = true;

                //    //// Password settings
                //    //options.Password.RequireDigit = true;
                //    //options.Password.RequiredLength = 8;
                //    //options.Password.RequireNonAlphanumeric = false;
                //    //options.Password.RequireUppercase = true;
                //    //options.Password.RequireLowercase = false;

                //    //// Lockout settings
                //    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //    //options.Lockout.MaxFailedAccessAttempts = 10;

                options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

           // services.AddHttpsRedirection(option => option.HttpsPort = 5002);
            services.AddOpenIddict().AddCore(options =>
            {
                // Configure OpenIddict to use the EF Core stores/models.
                options.UseEntityFrameworkCore()
                       .UseDbContext<ApplicationDbContext>();
            })
            // Register the OpenIddict server handler.
            .AddServer(options =>
            {
                // Register the ASP.NET Core MVC services used by OpenIddict.
                // Note: if you don't call this method, you won't be able to
                // bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
                options.UseMvc();

                options.EnableAuthorizationEndpoint("/connect/authorize")
                       .EnableTokenEndpoint("/connect/token");
                //.AllowRefreshTokenFlow();
                options.AllowAuthorizationCodeFlow()
                       .AllowPasswordFlow()
                       .AllowRefreshTokenFlow();
               // options.AllowPasswordFlow();
                // Accept anonymous clients (i.e clients that don't send a client_id).
                options.AcceptAnonymousClients();

               
               


                // options.AllowAuthorizationCodeFlow()
                //.AllowPasswordFlow()
              
                options.RegisterScopes(
                    OpenIdConnectConstants.Scopes.Address,
                    OpenIdConnectConstants.Scopes.OpenId,
                    OpenIdConnectConstants.Scopes.Email,
                    OpenIdConnectConstants.Scopes.Phone,
                    OpenIdConnectConstants.Scopes.Profile,
                    OpenIdConnectConstants.Scopes.OfflineAccess,
                    OpenIddictConstants.Scopes.Roles);

                // Enable the password flow.
                options.EnableRequestCaching();

                // During development, you can disable the HTTPS requirement.
                options.DisableHttpsRequirement();
                // Enable the token endpoint.

            }



            );




            services.AddOpenIddict().AddValidation();



            // Add cors
            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1); ;

            services.AddSignalR();
            // services.AddSignalR();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Atomics Manager API", Version = "v1" });
                c.OperationFilter<AuthorizeCheckOperationFilter>();
                c.AddSecurityDefinition("OpenID Connect", new OAuth2Scheme
                {
                    Type = "oauth2",
                    Flow = "password",
                    TokenUrl = "/connect/token",
					Description = "Note: Leave client_id and client_secret blank"
,

                });
                //c.OperationFilter<FileUploadOperation>();
            });


            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, ApplicationPermissions.ViewUsers));
                options.AddPolicy(Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, ApplicationPermissions.ManageUsers));

                options.AddPolicy(Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, ApplicationPermissions.ViewRoles));
                options.AddPolicy(Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
                options.AddPolicy(Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, ApplicationPermissions.ManageRoles));

                options.AddPolicy(Policies.AssignAllowedRolesPolicy, policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
            });

            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });


           //services.AddHttpsRedirection(options => options.HttpsPort = 2830);
            // Repositories
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddScoped<IAccountManager, AccountManager>();

            // Auth Handlers
            services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

            // DB Creation and Seeding
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug(LogLevel.Warning);
            loggerFactory.AddFile(Configuration.GetSection("Logging"));



            Utilities.ConfigureLogger(loggerFactory);
            EmailTemplates.Initialize(env);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
            }


            app.UseCors(builder => builder
                           .AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod());


            app.UseHttpsRedirection();
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocumentTitle="Swagger UI - Atomics Manager API";
               
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Atomics Manager API API V1");
            });

            app.UseSignalR(route =>
            {
                route.MapHub<DataHub>("/dataHub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

        

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                   // spa.UseAngularCliServer(npmScript: "start");
                   spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}

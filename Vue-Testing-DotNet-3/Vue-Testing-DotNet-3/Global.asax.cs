using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Vue_Testing_DotNet_3
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

#if CONFIG == Debug
            var projectPath = Server.MapPath("/");
            Webpack.Service.Utility.StartWebPackDevServer($"{projectPath}bin", configName: "webpack.dev.config.js", configPath: projectPath);
#endif
        }
    }
}

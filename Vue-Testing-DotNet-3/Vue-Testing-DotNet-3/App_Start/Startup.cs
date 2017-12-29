using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(Vue_Testing_DotNet_3.App_Start.Startup))]

namespace Vue_Testing_DotNet_3.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR(new HubConfiguration { EnableJSONP = true });
        }
    }
}

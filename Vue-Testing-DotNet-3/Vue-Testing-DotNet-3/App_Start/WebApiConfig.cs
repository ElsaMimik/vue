using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Vue_Testing_DotNet_3
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
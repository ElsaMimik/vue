using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Vue_Testing_DotNet_3.Controllers
{
    public class ScriptPathFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            filterContext.Controller.ViewBag.ScriptPathPrefix = "~";

#if CONFIG == Debug
            
                filterContext.Controller.ViewBag.ScriptPathPrefix = "http://localhost:9090";
            
#endif

            base.OnActionExecuted(filterContext);
        }
    }
}
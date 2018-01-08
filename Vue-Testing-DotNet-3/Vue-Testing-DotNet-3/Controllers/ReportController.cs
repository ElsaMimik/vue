using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Vue_Testing_DotNet_3.Controllers
{
    [RoutePrefix("api/report")]
    public class ReportController : Controller
    {
        // GET: Report
        [Route("")]
        public ActionResult Index()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Vue_Testing_DotNet_3.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult SumAmount()
        {
            return View();
        }
    }
}
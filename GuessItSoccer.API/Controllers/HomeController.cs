﻿using System.Web.Mvc;
using AttributeRouting.Web.Mvc;

namespace GuessItSoccer.API.Controllers
{
    public class HomeController : Controller
    {
        [GET("/")]
        public ActionResult Index()
        {
            return View();
        }
    }
}

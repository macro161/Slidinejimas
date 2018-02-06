using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SkiingResort.Models;

namespace SkiingResort.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var resort = new Models.SkiingResort();
            var currentWeather = new Weather();

            currentWeather.Humidity = 0.7F;
            currentWeather.Cloudiness = 1;

            resort.CurrentWeather = currentWeather;

            var newStr = "";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
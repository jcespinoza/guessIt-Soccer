using System.Web.Mvc;

namespace GuessItSoccer.API.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}

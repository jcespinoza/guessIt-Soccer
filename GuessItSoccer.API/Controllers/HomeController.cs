using System.Web.Mvc;
using AttributeRouting.Web.Mvc;

namespace GuessItSoccer.API.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("")]
        public ActionResult Index()
        {
            return View();
        }
    }
}

using System.Web.Mvc;

namespace WebSite.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact(int? id)
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
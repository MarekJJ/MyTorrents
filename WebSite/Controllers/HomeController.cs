using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using MvcSiteMapProvider.Linq;
using TOR.Core.Entitis;
using TOR.Services.JsonSerialization;


namespace WebSite.Controllers
{
    public class HomeController : Controller
    {
        readonly DbContext dbContext;

        public HomeController(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        // GET: Home
        public ActionResult About()
        {


            var activities = dbContext.Set<Status>()
                   .Where(x => x.Code != null)
                   .ToList();
            return View(); //activities.AsJsonResult();  
        }

        public ActionResult Contact(int? id)
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
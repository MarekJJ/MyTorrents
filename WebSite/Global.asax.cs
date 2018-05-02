using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Practices.Unity;

namespace WebSite
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static IUnityContainer UnityContainer { get; private set; }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //MvcSiteMapProvider.DI.Composer.Compose();
        }
    }
}

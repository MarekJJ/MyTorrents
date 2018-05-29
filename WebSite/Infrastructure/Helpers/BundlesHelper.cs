using System.Web.Mvc;
using WebSite.App_Start;


namespace WebSite.Infrastructure.Helpers
{
    public static class BundlesHelper
    {
        public static MvcHtmlString CssBundle(this HtmlHelper helper, string bundleName)
        {
            var isDebug = false;

            isDebug = true;

            return helper.HtmlCssCached(bundleName, isDebug);
        }


        public static MvcHtmlString JsBundle(this HtmlHelper helper, string bundleName)
        {
            var isDebug = false;

            isDebug = true;

            return helper.HtmlScriptsCached(bundleName, isDebug);
        }
    }
}
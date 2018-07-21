using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebSite.Infrastructure.Helpers
{
    public static class AngularHelper
    {
        public static AngularModuleFluentApi AngularModule(this HtmlHelper htmlHelper, string moduleName) //notka ten helper jest dla dołaczenia modułow w vidoku
        {
            return new AngularModuleFluentApi(htmlHelper, moduleName);
        }
    }

    public class AngularModuleFluentApi
    {
        private HtmlHelper htmlHelper;
        private string moduleName;
        private List<string> dependencies = new List<string>();

        public AngularModuleFluentApi(HtmlHelper htmlHelper, string moduleName)
        {
            this.htmlHelper = htmlHelper;
            this.moduleName = moduleName;
        }

        public AngularModuleFluentApi WithDependantModules(params string[] dependencies)
        {
            this.dependencies.AddRange(dependencies);
            return this;
        }

        public AngularModuleFluentApi WithDependantModulesFromViewBag()
        {
            var angularModules = htmlHelper.ViewBag.AngularModules as string;
            if (!string.IsNullOrEmpty(angularModules))
            {
                var angularModuleNames = angularModules.Split(';');
                return WithDependantModules(angularModuleNames);
            }

            return this;
        }

        public IHtmlString Generate()
        {
            var dependenciesContent = string.Join(", ", this.dependencies.Distinct().Select(d => $"'{d}'"));
            var content = $"var {moduleName} = angular.module('{moduleName}', [{dependenciesContent}]);";
            return new MvcHtmlString(content);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcSiteMapProvider.Web.Html.Models;

namespace WebSite.Views.Shared.DisplayTemplates
{
    public static class MenuHelper
    {
        public static int GetNodeLevel(this SiteMapNodeModel node)
        {
            var level = 0;
            while (node.Parent != null)
            {
                level++;
                node = node.Parent;
            }

            return level;
        }

        public static IHtmlString GetNonClickableLinkElement(this SiteMapNodeModel node)
        {
            var tagBuilder = new TagBuilder("a");
            tagBuilder.InnerHtml += node.GetIconElement();
            tagBuilder.InnerHtml += node.Title;
            tagBuilder.InnerHtml += node.GetArrowIcon();
            return new MvcHtmlString(tagBuilder.ToString());
        }

        public static string GetIconElement(this SiteMapNodeModel node)
        {
            return node.GetNodeLevel() <= 2
                ? $"<i class=\"fa { node.ImageUrl.Trim('/') }\"></i>"
                : string.Empty;
        }


        private static IHtmlString GetArrowIcon(this SiteMapNodeModel node)
        {
            return new MvcHtmlString(node.Children.Any()
                ? "<span class=\"fa fa-chevron-down\"></span>"
                : string.Empty);
        }

        public static string GetCurrentPageCssClassIfIsCurrentNode(this SiteMapNodeModel node)
        {
            return node.IsCurrentNode ? "current-page" : string.Empty;
        }

        public static string GetActiveCssClassIfIsInCurrentPath(this SiteMapNodeModel node)
        {
            return node.IsInCurrentPath && IsNormalMenuSize() ? "active" : string.Empty;
        }

        public static string GetStyleDisplayBlockIfIsInCurrentPath(this SiteMapNodeModel node)
        {
            return node.IsInCurrentPath && IsNormalMenuSize() ? "display:block" : string.Empty;
        }

        public static string GetMenuSizeCssClass()
        {
            return HttpContext.Current.Request.Cookies["dsr.menu-size"]?.Value ?? "nav-md";
        }

        public static bool IsNormalMenuSize()
        {
            return GetMenuSizeCssClass().Equals("nav-md");
        }
    }
}
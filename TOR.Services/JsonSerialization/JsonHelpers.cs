using System.Text;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace TOR.Services.JsonSerialization
{
    public static class JsonHelpers
    {
        public static ActionResult AsJsonResult(this object model) //notka  odana przezemnie 
        {
            var jsonContent = JsonConvert.SerializeObject(model, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            return new ContentResult
            {
                Content = jsonContent,
                ContentEncoding = Encoding.UTF8,
                ContentType = "application/json"
            };
        }
    }
}

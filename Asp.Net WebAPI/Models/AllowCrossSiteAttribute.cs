
using Microsoft.AspNetCore.Mvc.Filters;

public class AllowCrossSiteAttribute : ResultFilterAttribute
{
    public override void OnResultExecuting(ResultExecutingContext context)
    {
        context.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "Content-Length, X-JSON");
        context.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Accept-Language, X-Authorization");
        context.HttpContext.Response.Headers.Add("Access-Control-Max-Age", "86400");
        base.OnResultExecuting(context);
    }
}
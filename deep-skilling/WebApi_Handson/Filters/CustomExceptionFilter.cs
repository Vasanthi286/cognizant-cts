using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi_Handson.Filters
{
    public class CustomExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(new
            {
                StatusCode = 500,
                Message = "An unexpected error occurred.",
                Error = context.Exception.Message
            })
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}
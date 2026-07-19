using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthDemo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SecureController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSecretData()
        {
            var username = User.Identity?.Name ?? "Unknown User";
            return Ok(new
            {
                Message = "This is a secured endpoint. Access granted!",
                AuthorizedUser = username,
                Timestamp = DateTime.UtcNow
            });
        }
    }
}

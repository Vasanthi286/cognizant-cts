using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtAuthDemo.Models;

namespace JwtAuthDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if (IsValidUser(model))
            {
                var token = GenerateJwtToken(model.Username);
                return Ok(new { Token = token });
            }
            return Unauthorized(new { Message = "Invalid username or password" });
        }

        private bool IsValidUser(LoginModel model)
        {
            // Simple mock user validation
            return model.Username == "admin" && model.Password == "password";
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var secretKey = _configuration["Jwt:Key"] ?? "ThisIsASecretKeyForJwtToken32Characters";
            var issuer = _configuration["Jwt:Issuer"] ?? "MyAuthServer";
            var audience = _configuration["Jwt:Audience"] ?? "MyApiUsers";
            var durationInMinutes = double.TryParse(_configuration["Jwt:DurationInMinutes"], out var duration) ? duration : 60;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(durationInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

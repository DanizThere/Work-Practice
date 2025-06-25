using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using work_practice_backend.Database;
using work_practice_backend.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Linq;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private ApplicationContext _db;
        private IConfiguration _configuration;

        public UsersController(ApplicationContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> Get()
        {
            return await _db.users.ToListAsync();
        }

        [HttpGet("state/{companyId}")]
        public async Task<ActionResult<IEnumerable<Users>>> GetCompanyState(string companyId)
        {
            var names = await _db.companystates.Where(c => c.name == companyId).Select(c => c.username).ToListAsync();
            var users = await _db.users.Where(u => names.Contains(u.email)).ToListAsync();
            return users;
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{userEmail}")]
        public async Task<ActionResult<Users>> GetUser(string userEmail)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.nickname == userEmail);

            if(user == null) { return NotFound(); }
            return Ok(user);
        }

        [HttpGet("tryget/{userEmail}")]
        public async Task<ActionResult<Users>> TryGet(string userEmail)
        {
            var company = await _db.users.FirstOrDefaultAsync(u => u.email == userEmail);

            if (company == null) return Ok(userEmail);

            return Forbid();
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("delete/{userEmail}")]
        public async Task<ActionResult<Users>> DeleteUser(string userEmail)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.name == userEmail);

            if (user == null) { return NotFound(); }

            _db.Remove(user);
            await _db.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Users>> PostUser(Users user)
        {
            if (user == null) { return NotFound(); }

            _db.Add(user);
            await _db.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<Users>> Login(Login login)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => login.Email == u.email && login.Password == u.password);

            if(user == null) return Unauthorized();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWT:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("email", user.email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn);

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new {Token = tokenValue, User = user, Role = user.role});
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<Users>> PatchUser(Users user)
        {
            if (user == null) { return BadRequest(); }
            if (!_db.users.Any(u => u.email == user.email)) { return NotFound(); }

            _db.Update(user);
            await _db.SaveChangesAsync();
            return Ok(user);
        }
    }
}

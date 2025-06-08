using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private ApplicationContext _db;

        public UsersController(ApplicationContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> Get()
        {
            return await _db.users.ToListAsync();
        }

        [Authorize]
        [HttpGet("state/{companyEmail}")]
        public async Task<ActionResult<IEnumerable<Users>>> GetCompanyWorkers(string companyEmail)
        {
            var companyUsers = await _db.companystates.Where(u => u.name == companyEmail).ToListAsync();
            var users = companyUsers.Select(u => u.name).ToList();

            return await _db.users.Where(u => users.Contains(u.email)).ToListAsync();
        }

        [Authorize]
        [HttpGet("{userEmail}")]
        public async Task<ActionResult<Users>> GetUser(string userEmail)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.name == userEmail);

            if(user == null) { return NotFound(); }
            return Ok(user);
        }

        [Authorize]
        [HttpDelete("{userEmail}")]
        public async Task<ActionResult<Users>> DeleteUser(string userEmail)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.name == userEmail);

            if (user == null) { return NotFound(); }

            _db.Remove(user);
            await _db.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> PostUser(Users user)
        {
            if (user == null) { return NotFound(); }

            _db.Add(user);
            await _db.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize]
        [HttpPatch]
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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserDecksController : ControllerBase
    {
        private ApplicationContext _db;

        public UserDecksController(ApplicationContext db) => _db = db;

        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDecks>>> GetUserDecks()
        {
            return await _db.userdecks.ToListAsync();
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{userDeckId}")]
        public async Task<ActionResult<UserDecks>> GetOne(string userDeckId)
        {
            var userdeck = await _db.userdecks.FirstOrDefaultAsync(u => u.id == userDeckId);

            if (userdeck == null) return NotFound();
            return Ok(userdeck);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{userDeckId}")]
        public async Task<ActionResult<UserDecks>> DeleteDeck(string userdeckid)
        {
            var userdeck = await _db.userdecks.FirstOrDefaultAsync(u => u.id == userdeckid);

            if (userdeck == null) return NotFound();

            _db.Remove(userdeck);
            await _db.SaveChangesAsync();
            return Ok(userdeck);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<UserDecks>> PatchDeck(UserDecks userdeck)
        {
            if (userdeck == null) return BadRequest();
            if (!_db.userdecks.Contains(userdeck)) return BadRequest();

            _db.Update(userdeck);
            await _db.SaveChangesAsync();
            return Ok(userdeck);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<UserDecks>> PostDeck(UserDecks userdeck)
        {
            if (userdeck == null) { return NotFound(); }

            _db.Add(userdeck);
            await _db.SaveChangesAsync();
            return Ok(userdeck);
        }
    }
}

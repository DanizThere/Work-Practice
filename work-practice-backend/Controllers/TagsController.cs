using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private ApplicationContext _db;

        public TagsController(ApplicationContext db) => _db = db;

        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tags>>> GetTags()
        {
            return await _db.tags.ToListAsync();
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{tagName}")]
        public async Task<ActionResult<Tags>> GetOne(string tagName)
        {
            var tag = await _db.tags.FirstOrDefaultAsync(u => u.nametag == tagName);

            if (tag == null) return NotFound();
            return Ok(tag);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{tagName}")]
        public async Task<ActionResult<Tags>> DeleteTag(string tagName)
        {
            var tag = await _db.tags.FirstOrDefaultAsync(u => u.nametag == tagName);

            if (tag == null) return NotFound();

            _db.Remove(tag);
            await _db.SaveChangesAsync();
            return Ok(tag);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<Tags>> PatchTag(Tags tag)
        {
            if (tag == null) return BadRequest();
            if (!_db.tags.Contains(tag)) return BadRequest();

            _db.Update(tag);
            await _db.SaveChangesAsync();
            return Ok(tag);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<Tags>> PostTag(Tags tag)
        {
            if (tag == null) { return NotFound(); }

            _db.Add(tag);
            await _db.SaveChangesAsync();
            return Ok(tag);
        }
    }
}

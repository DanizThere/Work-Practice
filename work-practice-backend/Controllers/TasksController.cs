using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private ApplicationContext _db;

        public TasksController(ApplicationContext db) => _db = db;

        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetTasks()
        {
            return await _db.tasks.ToListAsync();
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{tasksName}")]
        public async Task<ActionResult<Tasks>> GetOne(string tasksName)
        {
            var task = await _db.tasks.FirstOrDefaultAsync(u => u.name == tasksName);

            if (task == null) return NotFound();
            return Ok(task);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{tasksName}")]
        public async Task<ActionResult<Tasks>> DeleteTask(string tasksName)
        {
            var task = await _db.tasks.FirstOrDefaultAsync(u => u.name == tasksName);

            if (task == null) return NotFound();

            _db.Remove(task);
            await _db.SaveChangesAsync();
            return Ok(task);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<Tasks>> PatchTask(Tasks task)
        {
            if (task == null) return BadRequest();
            if (!_db.tasks.Contains(task)) return BadRequest();

            _db.Update(task);
            await _db.SaveChangesAsync();
            return Ok(task);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<Tasks>> PostTask(Tasks task)
        {
            if (task == null) { return NotFound(); }

            _db.Add(task);
            await _db.SaveChangesAsync();
            return Ok(task);
        }
    }
}

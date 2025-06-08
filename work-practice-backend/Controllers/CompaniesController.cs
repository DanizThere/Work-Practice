using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private ApplicationContext _db;

        public CompaniesController(ApplicationContext db) => _db = db;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Companies>>> Get()
        {
            return await _db.companies.ToListAsync();
        }
    }
}

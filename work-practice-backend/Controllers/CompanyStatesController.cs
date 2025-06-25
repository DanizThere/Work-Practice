using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompanyStatesController : ControllerBase
    {
        private ApplicationContext _db;

        public CompanyStatesController(ApplicationContext db) => _db = db;

        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyStates>>> GetCompanies()
        {
            return await _db.companystates.ToListAsync();
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{companyId}")]
        public async Task<ActionResult<CompanyStates>> GetOne(string companyId)
        {
            var company = await _db.companystates.FirstOrDefaultAsync(u => u.name == companyId);

            if (company == null) return NotFound();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<CompanyStates>> GetUserCompanies(string userId)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.nickname == userId);
            var company = await _db.companystates.Where(u => u.username == user.email).ToListAsync();

            if (company == null) return NotFound();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{companyId}")]
        public async Task<ActionResult<CompanyStates>> DeleteCompanyStates(string companyId)
        {
            var company = await _db.companystates.FirstOrDefaultAsync(u => u.name == companyId);

            if (company == null) return NotFound();

            _db.Remove(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<CompanyStates>> PatchCompanyStates(CompanyStates company)
        {
            if (company == null) return BadRequest();
            if (!_db.companystates.Contains(company)) return BadRequest();

            _db.Update(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<CompanyStates>> PostCompanyStates(CompanyStates company)
        {
            if (company == null) { return NotFound(); }

            _db.Add(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }
    }
}

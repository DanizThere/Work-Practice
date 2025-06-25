using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_practice_backend.Database;
using work_practice_backend.Models;

namespace work_practice_backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompanyDecksController : ControllerBase
    {
        private ApplicationContext _db;

        public CompanyDecksController(ApplicationContext db) => _db = db;

        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyDecks>>> GetCompaniesDecks()
        {
            return await _db.companydecks.ToListAsync();
        }

        [Authorize(Roles = "admin, user")]
        [HttpGet("{companyId}")]
        public async Task<ActionResult<CompanyDecks>> GetOne(string companyId)
        {
            var company = await _db.companydecks.Where(u => u.companyemail == companyId).ToListAsync();

            if (company == null) return NotFound();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{companyId}")]
        public async Task<ActionResult<CompanyDecks>> DeleteCompanyDeck(string companyId)
        {
            var company = await _db.companydecks.FirstOrDefaultAsync(u => u.id == companyId);

            if (company == null) return NotFound();

            _db.Remove(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<CompanyDecks>> PatchCompany(CompanyDecks company)
        {
            if (company == null) return BadRequest();
            if (!_db.companydecks.Contains(company)) return BadRequest();

            _db.Update(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<CompanyDecks>> PostCompany(CompanyDecks company)
        {
            if (company == null) { return NotFound(); }

            _db.Add(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }
    }
}

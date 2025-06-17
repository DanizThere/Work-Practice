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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Companies>>> GetCompanies()
        {
            return await _db.companies.ToListAsync();
        }

        [HttpGet("{companyId}")]
        public async Task<ActionResult<Companies>> GetOne(string companyId)
        {
            var company = await _db.companies.FirstOrDefaultAsync(u => u.name == companyId);

            if(company == null) return NotFound();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpDelete("drop/{companyId}")]
        public async Task<ActionResult<Companies>> DeleteCompany(string companyId)
        {
            var company = await _db.companies.FirstOrDefaultAsync(u => u.name == companyId);

            if(company == null) return NotFound();

            _db.Remove(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [Authorize(Roles = "admin, user")]
        [HttpPatch("update")]
        public async Task<ActionResult<Companies>> PatchCompany(Companies company)
        {
            if(company == null) return BadRequest();
            if(!_db.companies.Contains(company)) return BadRequest();

            _db.Update(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }

        [HttpPost("trycreate/{companyId}")]
        public async Task<ActionResult<Companies>> TryPost(string companyId)
        {
            var company = await _db.companies.FirstOrDefaultAsync(u => u.corporateemail == companyId);

            if(company == null) return Ok(companyId);

            return Forbid();
        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("register")]
        public async Task<ActionResult<Companies>> PostCompany(Companies company)
        {
            if (company == null) { return NotFound(); }

            _db.Add(company);
            await _db.SaveChangesAsync();
            return Ok(company);
        }
    }
}

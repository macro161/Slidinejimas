using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Visitors.Models;

namespace Slidinejimas.Controllers
{
    [Produces("application/json")]
    [Route("api/Statistikos")]
    public class StatistikosController : Controller
    {
        private readonly AppDbContext _context;

        public StatistikosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Statistikos
        [HttpGet]
        public IEnumerable<Statistika> GetStatistika()
        {
            return _context.Statistika;
        }

        // GET: api/Statistikos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStatistika([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var statistika = await _context.Statistika.SingleOrDefaultAsync(m => m.Id == id);

            if (statistika == null)
            {
                return NotFound();
            }

            return Ok(statistika);
        }

        // PUT: api/Statistikos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> AtnaujintiStatistika([FromRoute] Guid id, [FromBody] Statistika statistika)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != statistika.Id)
            {
                return BadRequest();
            }

            _context.Entry(statistika).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatistikaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Statistikos
        [HttpPost]
        public async Task<IActionResult> PridetiStatistika([FromBody] Statistika statistika)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Statistika.Add(statistika);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatistika", new { id = statistika.Id }, statistika);
        }

        // DELETE: api/Statistikos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatistika([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var statistika = await _context.Statistika.SingleOrDefaultAsync(m => m.Id == id);
            if (statistika == null)
            {
                return NotFound();
            }

            _context.Statistika.Remove(statistika);
            await _context.SaveChangesAsync();

            return Ok(statistika);
        }

        private bool StatistikaExists(Guid id)
        {
            return _context.Statistika.Any(e => e.Id == id);
        }
    }
}
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
    [Route("api/PaslauguKrepselis")]
    public class PaslauguKrepselisController : Controller
    {
        private readonly AppDbContext _context;

        public PaslauguKrepselisController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PaslauguKrepselis
        [HttpGet]
        public IEnumerable<PaslauguKrepselis> GetPaslauguKrepseliai()
        {
            return _context.PaslauguKrepseliai;
        }

        // GET: api/PaslauguKrepselis/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaslauguKrepselis([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paslauguKrepselis = await _context.PaslauguKrepseliai.SingleOrDefaultAsync(m => m.Id == id);

            if (paslauguKrepselis == null)
            {
                return NotFound();
            }

            return Ok(paslauguKrepselis);
        }

        // PUT: api/PaslauguKrepselis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> AtnaujintiPaslauguKrepseli([FromRoute] Guid id, [FromBody] PaslauguKrepselis paslauguKrepselis)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paslauguKrepselis.Id)
            {
                return BadRequest();
            }

            _context.Entry(paslauguKrepselis).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaslauguKrepselisExists(id))
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

        // POST: api/PaslauguKrepselis
        [HttpPost]
        public async Task<IActionResult> PridetiPaslauguKrepseli([FromBody] PaslauguKrepselis paslauguKrepselis)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PaslauguKrepseliai.Add(paslauguKrepselis);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaslauguKrepselis", new { id = paslauguKrepselis.Id }, paslauguKrepselis);
        }

        // DELETE: api/PaslauguKrepselis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaslauguKrepselis([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paslauguKrepselis = await _context.PaslauguKrepseliai.SingleOrDefaultAsync(m => m.Id == id);
            if (paslauguKrepselis == null)
            {
                return NotFound();
            }

            _context.PaslauguKrepseliai.Remove(paslauguKrepselis);
            await _context.SaveChangesAsync();

            return Ok(paslauguKrepselis);
        }

        private bool PaslauguKrepselisExists(Guid id)
        {
            return _context.PaslauguKrepseliai.Any(e => e.Id == id);
        }
    }
}
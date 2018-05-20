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
    [Route("api/Trasu")]
    public class TrasuController : Controller
    {
        private readonly AppDbContext _context;

        public TrasuController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Trasu
        [HttpGet]
        public IEnumerable<Trasa> GetTrasos()
        {
            return _context.Trasos;
        }

        // GET: api/Trasu/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrasa([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trasa = await _context.Trasos.SingleOrDefaultAsync(m => m.Id == id);

            if (trasa == null)
            {
                return NotFound();
            }

            return Ok(trasa);
        }

        // PUT: api/Trasu/5
        [HttpPut("{id}")]
        public async Task<IActionResult> AtnaujintiTrasa([FromRoute] Guid id, [FromBody] Trasa trasa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trasa.Id)
            {
                return BadRequest();
            }

            _context.Entry(trasa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrasaExists(id))
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

        // POST: api/Trasu
        [HttpPost]
        public async Task<IActionResult> ProdetiTrasa([FromBody] Trasa trasa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Trasos.Add(trasa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrasa", new { id = trasa.Id }, trasa);
        }

        // DELETE: api/Trasu/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrasa([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trasa = await _context.Trasos.SingleOrDefaultAsync(m => m.Id == id);
            if (trasa == null)
            {
                return NotFound();
            }

            _context.Trasos.Remove(trasa);
            await _context.SaveChangesAsync();

            return Ok(trasa);
        }

        private bool TrasaExists(Guid id)
        {
            return _context.Trasos.Any(e => e.Id == id);
        }
    }
}
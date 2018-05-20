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
    [Route("api/Paslaugos")]
    public class PaslaugosController : Controller
    {
        private readonly AppDbContext _context;

        public PaslaugosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Paslaugos
        [HttpGet]
        public IEnumerable<Paslauga> GetPaslaugos()
        {
            return _context.Paslaugos;
        }

        // GET: api/Paslaugos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaslauga([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paslauga = await _context.Paslaugos.SingleOrDefaultAsync(m => m.Id == id);

            if (paslauga == null)
            {
                return NotFound();
            }

            return Ok(paslauga);
        }

        // PUT: api/Paslaugos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> AtnaujintiPaslauga([FromRoute] Guid id, [FromBody] Paslauga paslauga)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paslauga.Id)
            {
                return BadRequest();
            }

            _context.Entry(paslauga).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaslaugaExists(id))
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

        // POST: api/Paslaugos
        [HttpPost]
        public async Task<IActionResult> PridetiPaslauga([FromBody] Paslauga paslauga)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Paslaugos.Add(paslauga);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaslauga", new { id = paslauga.Id }, paslauga);
        }

        // DELETE: api/Paslaugos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaslauga([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paslauga = await _context.Paslaugos.SingleOrDefaultAsync(m => m.Id == id);
            if (paslauga == null)
            {
                return NotFound();
            }

            _context.Paslaugos.Remove(paslauga);
            await _context.SaveChangesAsync();

            return Ok(paslauga);
        }

        private bool PaslaugaExists(Guid id)
        {
            return _context.Paslaugos.Any(e => e.Id == id);
        }
    }
}
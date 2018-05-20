using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Visitors.Models;
using Visitors.Models.DTO;
using Visitors.Models.Responses;

namespace Visitors.Controllers
{
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;

        public UserController(AppDbContext appDbContext, UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUser()
        {
            var name = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var result = new
            {
                Name = user.UserName,
            };
            return Ok(result);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginDTO registerInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new User() { UserName = registerInfo.UserName };
            var result = await _userManager.CreateAsync(user, registerInfo.Password);
            await _userManager.AddToRoleAsync(user, "Admin");
            if (!result.Succeeded)
            {
                return StatusCode((int)HttpStatusCode.Conflict, new ErrorResponse
                {
                    ErrorMessage = string.Join(Environment.NewLine, result.Errors.Select(x => x.Description))
                });
            }
            return NoContent();
        }
    }
}

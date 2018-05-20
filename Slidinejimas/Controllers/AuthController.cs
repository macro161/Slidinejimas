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

namespace Visitors.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly SignInManager<User> _signInManager;

        public AuthController(AppDbContext appDbContext, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {

            const bool rememberSignIn = false;
            const bool loginLockout = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, rememberSignIn, loginLockout);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}

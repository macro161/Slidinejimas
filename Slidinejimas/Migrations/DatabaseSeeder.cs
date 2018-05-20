using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Visitors.Models;

namespace Visitors.Migrations
{
    public class DatabaseSeeder
    {
        private readonly RoleManager<Role>  _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public DatabaseSeeder(RoleManager<Role> roleManager, UserManager<User> userManager, IConfiguration configuration)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task SeedData()
        {
            //Setup default roles
            var adminRoleName = _configuration["Roles:Admin"];
            if ( !await _roleManager.RoleExistsAsync(adminRoleName))
            {
                
                await _roleManager.CreateAsync(new Role() { Name = adminRoleName });
            }
            
            //Setup default admin
            var defaultAdminUserName = _configuration["Admin:UserName"];
            var defaultAdminPassword = _configuration["Admin:Password"];
            if (!_userManager.Users.Any())
            {
                var admin = new User() { UserName = defaultAdminUserName };
                IdentityResult userCreationResult = await _userManager.CreateAsync(admin, defaultAdminPassword);
              
                if (!userCreationResult.Succeeded)
                {
                    throw new Exception("cannot create default admin");
                }

                IdentityResult roleAssignResult = await _userManager.AddToRoleAsync(admin, adminRoleName);

                if (!roleAssignResult.Succeeded)
                {
                    throw new Exception("cannot assign admin role to default admin");
                }


            }

        }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Visitors.Models.DTO
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }  
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Visitors.Models
{
    public class PaslauguKrepselis
    {
        [Key]
        public Guid Id { get; set; }

        public Guid Id_vartotojo { get; set; }

        public Guid Id_paslaugos { get; set; }

        public DateTime UzsakymoData { get; set; }

        public DateTime BaigimosiData {get; set;}

        public int Vienetai { get; set; }
    }
}
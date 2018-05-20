using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Visitors.Models
{
    public class Trasa
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string Pavadinimas { get; set; }

        public int IlgisMetrais { get; set; }

        [MaxLength(20)]
        public string DarboLaikas { get; set; }

        public string Aprasymas {get; set;}
    }
}
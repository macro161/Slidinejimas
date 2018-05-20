using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Visitors.Models
{
    public class Paslauga
    {
        [Key]
        public Guid Id { get; set; }

        public string Pavadinimas { get; set; }

        public string Paveiksliukas { get; set; }

        public string Informacija { get; set; }

    }
}
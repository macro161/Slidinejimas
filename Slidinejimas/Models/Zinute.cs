using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Visitors.Models
{
    public class Zinute
    {
        [Key]
        public Guid Id { get; set; }

        public Guid Id_siuntejo { get; set; }

        public Guid Id_gavejo { get; set; }

        public string Tekstas { get; set; }

        public DateTime Data {get; set;}
    }
}
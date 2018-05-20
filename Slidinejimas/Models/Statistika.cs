using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Visitors.Models
{
    public class Statistika
    {
        [Key]
        public Guid Id { get; set; }

        public Guid Id_vartojo { get; set; }

        public Guid Id_trasos { get; set; }

        public double VidutinisGreitis { get; set; }

        public double GreiciausiasLaikas { get; set; }

        public double PraleistasLaias { get; set; }

        public DateTime PaskutinioApsilankymoData {get; set;}
    }
}
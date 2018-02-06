using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiingResort.Models
{
    public class SkiingResort
    {
        public Weather CurrentWeather { get; set; }
        public List<Weather> AllWeathers { get; set; }
    }
}
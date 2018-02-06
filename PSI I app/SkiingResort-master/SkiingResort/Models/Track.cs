using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiingResort.Models
{
    public class Track
    {
        public string Name { get; set; }
        public int Level { get; set; }
        public int Capacity { get; set; }
        public List<Customer> TrackCustomers { get; set; }
    }
}
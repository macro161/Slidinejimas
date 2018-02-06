using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiingResort.Models
{
    public class Customer
    {
        /*
         Basic properties. Other data may be
         needed about the customer.
             */
        public string Name { get; set; }
        public string Surname { get; set; } 
        public int Money { get; set; }
    }
}
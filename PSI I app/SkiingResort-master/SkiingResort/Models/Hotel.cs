using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiingResort.Models
{
    public class Hotel
    {
        public string Name { get; set; } //maybe obsolete
        public List<Room> AllRooms { get; set; }
    }
}
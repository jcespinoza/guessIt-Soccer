using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GuessItSoccer.API.Models
{
    public class StadiumModel
    {
        public long Id { get; set; }
        public bool IsArchived { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public LocationModel Location { get; set; }
    }
}
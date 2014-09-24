using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GuessItSoccer.API.Models
{
    public class TeamModel
    {
        public long Id { get; set; }
        public bool IsArchived { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
    }
}
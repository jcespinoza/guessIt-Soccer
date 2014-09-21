using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GuessItSoccer.API.Controllers;

namespace GuessItSoccer.API.Models
{
    public class GameModel
    {
        public long Id { get; set; }
        public bool IsArchived { get; set; }
        public TeamModel HomeTeam { get; set; }
        public TeamModel AwayTeam { get; set; }
        public DateTime MatchDate { get; set; }
        public ResultDataModel Result { get; set; }
        public bool Completed { get; set; }
    }
}
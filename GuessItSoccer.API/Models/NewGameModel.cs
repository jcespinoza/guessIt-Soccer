using System;

namespace GuessItSoccer.API.Models
{
    public class NewGameModel
    {
        public string HomeTeamName { get; set; }
        public string AwayTeamName { get; set; }
        public DateTime MatchDate { get; set; }
    }
}
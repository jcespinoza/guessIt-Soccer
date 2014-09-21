using System;

namespace GuessItSoccer.API.Models
{
    public class UpdateGameModel
    {
        public long GameId { get; set; }
        public string HomeTeamName { get; set; }
        public string AwayTeamName { get; set; }
        public DateTime MatchDate { get; set; }
    }
}
using System;
using GuessItSoccer.Domain.Entities;

namespace GuessItSoccer.API.Models
{
    public class NewGameModel
    {
        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        public DateTime MatchDate { get; set; }
    }
}
namespace GuessItSoccer.API.Models
{
    public class TeamUpdateModel
    {
        public long LeagueId { get; set; }
        public long TeamId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
    }
}
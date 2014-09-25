using GuessItSoccer.Domain.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace GuessItSoccer.API.Controllers
{
    public class ResultDataModel
    {
        public long Id { get; set; }
        public bool IsArchived { get; set; }
        public int HomeTeamGoals { get; set; }
        public int AwayTeamGoals { get; set; }
        public int HomeTeamPenalties { get; set; }
        public int AwayTeamPenalties { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public WinnerTeam Winner { get; set; }
    }
}
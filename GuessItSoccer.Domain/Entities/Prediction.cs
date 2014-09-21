namespace GuessItSoccer.Domain.Entities
{
    public class Prediction: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual int HomeTeamGoals { get; set; }
        public virtual int AwayTeamGoals { get; set; }
        public virtual int HomeTeamPenalties { get; set; }
        public virtual int AwayTeamPenalties { get; set; }
        public virtual Team WinnerTeam { get; set; }
    }
}

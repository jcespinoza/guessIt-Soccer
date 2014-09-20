namespace GuessItSoccer.Domain.Entities
{
    public class Prediction: Result, IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual Game Game { get; set; }
    }
}

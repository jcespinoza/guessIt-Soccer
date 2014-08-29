namespace GuessItSoccer.Domain.Entities
{
    public class Team: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual string Name { get; set; }
    }
}
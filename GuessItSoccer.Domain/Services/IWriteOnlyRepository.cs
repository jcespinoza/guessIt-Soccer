using System.Collections.Generic;
using GuessItSoccer.Domain.Entities;

namespace GuessItSoccer.Domain.Services
{
    public interface IWriteOnlyRepository
    {
        void Delete<T>(long itemId) where T : IEntity;
        T Update<T>(T itemToUpdate) where T : IEntity;
        T Create<T>(T itemToCreate) where T : IEntity;
        void DeleteAll<T>() where T : class, IEntity;
        IEnumerable<T> CreateAll<T>(IEnumerable<T> list) where T : IEntity;
    }
}

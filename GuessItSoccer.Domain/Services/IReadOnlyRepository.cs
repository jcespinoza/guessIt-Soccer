using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GuessItSoccer.Domain.Entities;

namespace GuessItSoccer.Domain.Services
{
    public interface IReadOnlyRepository
    {
        T First<T>(Expression<Func<T, bool>> query) where T : class, IEntity;
        T FirstOrDefault<T>(Expression<Func<T, bool>> query) where T : class, IEntity;
        T GetById<T>(long id) where T : IEntity;
        IEnumerable<T> GetAll<T>() where T : IEntity;
        IEnumerable<T> Query<T>(Expression<Func<T, bool>> expression) where T : IEntity;
    }
}

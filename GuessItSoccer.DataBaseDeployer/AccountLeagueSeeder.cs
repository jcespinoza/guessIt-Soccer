using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainDrivenDatabaseDeployer;
using GuessItSoccer.Domain.Entities;
using NHibernate;

namespace GuessItSoccer.DataBaseDeployer
{
    public class AccountLeagueSeeder: IDataSeeder
    {

        private readonly ISession _session;

        public AccountLeagueSeeder(ISession session)
        {
            _session = session;
        }

        public void Seed()
        {
            var accountLeague = new AccountLeague
            {
                User =
                    _session.QueryOver<Account>()
                        .Where(x => x.Email == "admin@jcespinoza.com")
                        .SingleOrDefault<Account>(),
                League = _session.QueryOver<League>().Where(x => x.Name == "Spanish La Liga").SingleOrDefault<League>()
            };
            _session.Save(accountLeague);
        }
    }
}

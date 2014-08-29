using DomainDrivenDatabaseDeployer;
using NHibernate;

namespace GuessItSoccer.DataBaseDeployer
{
    public class UserSeeder: IDataSeeder
    {
    	ISession _session;
        public UserSeeder(ISession session)
        {
            _session = session;
        }

        public void Seed()
        {
            //_session.Save();
        }
    }
}

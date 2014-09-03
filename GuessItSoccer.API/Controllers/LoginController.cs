using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Compilation;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using FluentNHibernate.Cfg.Db;
using GuessItSoccer.API.Models;
using GuessItSoccer.Data;
using GuessItSoccer.Domain.Entities;
using GuessItSoccer.Domain.Services;
using NHibernate;

namespace GuessItSoccer.API.Controllers
{
    public class LoginController : ApiController
    {
        private IReadOnlyRepository _readOnlyRepository;

        public LoginController() { }

        public LoginController(IReadOnlyRepository readOnlyRepository)
        {
            _readOnlyRepository = readOnlyRepository;
        }

        public AuthModel Post([FromBody]AccountLoginModel model)
        {
            string connectionString = ConnectionStrings.Get();

            MsSqlConfiguration databaseConfiguration =
                MsSqlConfiguration.MsSql2012.ShowSql().ConnectionString(x => x.Is(connectionString));

            ISessionFactory sessionFactory =
                new SessionFactoryBuilder(new MappingScheme(), databaseConfiguration).Build();
            _readOnlyRepository = new ReadOnlyRepository(sessionFactory.OpenSession());

            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user != null)
            {
                if (user.PasswordsEqual(model.Password))
                {
                    var authModel = new AuthModel();
                    authModel.Token = (new Sha256Encrypter()).Encrypt(Enumerable.Concat(user.Name, user.Email).ToString());
                    return authModel;
                }
                throw new HttpException((int)HttpStatusCode.Unauthorized, "Incorrect Email or Password");
            }
            throw new HttpException((int)HttpStatusCode.NotFound, "User does not exist.");
        }
    }
}

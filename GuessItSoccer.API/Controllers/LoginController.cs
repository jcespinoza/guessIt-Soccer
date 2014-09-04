using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Http;
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
        readonly IReadOnlyRepository _readOnlyRepository;

        public LoginController(IReadOnlyRepository readOnlyRepository)
        {
            _readOnlyRepository = readOnlyRepository;
        }

        [HttpPost]
        [AcceptVerbs("POST","HEAD")]
        [POST("login")]
        public AuthModel Post([FromBody]AccountLoginModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user == null) throw new HttpException((int)HttpStatusCode.NotFound, "User does not exist.");
            if (!user.PasswordsEqual(model.Password))
                throw new HttpException((int)HttpStatusCode.Unauthorized, "Incorrect Email or Password");
            var authModel = new AuthModel()
            {
                Token = (new Sha256Encrypter()).Encrypt(Enumerable.Concat(user.Name, user.Email).ToString())
            };
            return authModel;           
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AttributeRouting.Web.Http;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;
using GuessItSoccer.Domain.Services;
using NHibernate;

namespace GuessItSoccer.API.Controllers
{
    public class SignUpController : ApiController
    {
        
        readonly IWriteOnlyRepository _writeOnlyRepository;
        private readonly IReadOnlyRepository _readOnlyRepository;

        public SignUpController(IWriteOnlyRepository writeOnlyRepository, IReadOnlyRepository readOnlyRepository)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
        }

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("signup")]
        public AuthModel Post([FromBody] AccountSignUpModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user != null) throw new HttpException((int)HttpStatusCode.NotFound, "User already exists.");
            user = new Account()
            {
                IsArchived = false,
                Email = model.Email,
                Name = model.Name,
                Password = (new Sha256Encrypter()).Encrypt(model.Password),
            };
            _writeOnlyRepository.Create(user);
            var authModel = new AuthModel()
            {
                Token = (new Sha256Encrypter()).Encrypt(Enumerable.Concat(user.Name, user.Email).ToString())
            };
            return authModel;
        }
    }

    public class AccountSignUpModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
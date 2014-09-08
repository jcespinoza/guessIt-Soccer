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
        private readonly IEmailService _emailService;

        public SignUpController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IEmailService emailService)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _emailService = emailService;
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

            NotifyOnSignup(user.Name, user.Email);

            var authModel = new AuthModel()
            {
                Token = (new Sha256Encrypter()).Encrypt(string.Format("{0}{1}", user.Name, user.Email))
            };
            return authModel;
        }

        public void NotifyOnSignup(string who, string email)
        {
            _emailService.SendEmail(
                new List<string>(){string.Format("{0} <{1}>", who, email)},
                "GuessIt Soccer <noreply@guessitsoccer.apphb.com>",
                string.Format("Welcome to GuessIt Soccer {0}", who),
                "You have successfully created an account in GuessIt Soccer. Now you login and start predicting game results!"
                );
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Http;
using AutoMapper;
using FluentNHibernate.Cfg.Db;
using GuessItSoccer.API.Models;
using GuessItSoccer.Data;
using GuessItSoccer.Domain.Entities;
using GuessItSoccer.Domain.Services;
using NHibernate;

namespace GuessItSoccer.API.Controllers
{
    public class AccountController : ApiController
    {
        readonly IWriteOnlyRepository _writeOnlyRepository;
        private readonly IReadOnlyRepository _readOnlyRepository;
        private readonly IEmailService _emailService;
        private readonly IMappingEngine _mappingEngine;

        public AccountController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IEmailService emailService, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _emailService = emailService;
            _mappingEngine = mappingEngine;
        }

        [HttpPost]
        [AcceptVerbs("POST","HEAD")]
        [POST("login")]
        public AuthModel Login([FromBody]AccountLoginModel model)
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

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("signup")]
        public AuthModel SignUp([FromBody] AccountSignUpModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user != null) throw new HttpException((int)HttpStatusCode.NotFound, "User already exists.");
            user = _mappingEngine.Map<AccountSignUpModel, Account>(model);
            user.Password = (new Sha256Encrypter()).Encrypt(model.Password);

            _writeOnlyRepository.Create(user);

            NotifyOnSignup(user.Name, user.Email);

            var authModel = new AuthModel()
            {
                Token = (new Sha256Encrypter()).Encrypt(string.Format("{0}{1}", user.Name, user.Email))
            };
            return authModel;
        }

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("resetpassword")]
        public ResetConfirmationModel ResetPassword([FromBody] PasswordResetModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user == null) throw new HttpException((int)HttpStatusCode.NotFound, "User does not exist.");

            string pass = ResetPassword(user);
            NotifyOnResetPassword(user.Name, user.Email, pass);

            var confirmation = new ResetConfirmationModel()
            {
                Value = "Successfully sent an email to you inbox"
            };

            return confirmation;
        }

        private void NotifyOnResetPassword(string name, string email, string pass)
        {
            _emailService.SendEmail(
                new List<string>() { string.Format("{0} <{1}>", name, email) },
                "GuessIt Soccer <noreply@guessitsoccer.apphb.com>",
                string.Format("GuessIt Soccer - Password Reset", ""),
                string.Format("You have requested to reset you password in GuessIt Soccer.\n" +
                "Please go to the login area and use this password:\n!" +
                "Password: {0}\n\n\n" +
                "Remember to change this to your new password soon.", pass)
                );
        }

        private string ResetPassword(Account user)
        {
            string pass = Guid.NewGuid().ToString().Substring(0, 8);
            user.Password = (new Sha256Encrypter()).Encrypt(pass);
            _writeOnlyRepository.Update(user);
            return pass;
        }

        public void NotifyOnSignup(string who, string email)
        {
            _emailService.SendEmail(
                new List<string>() { string.Format("{0} <{1}>", who, email) },
                "GuessIt Soccer <noreply@guessitsoccer.apphb.com>",
                string.Format("Welcome to GuessIt Soccer {0}", who),
                "You have successfully created an account in GuessIt Soccer. Now you login and start predicting game results!"
                );
        }
    }
}

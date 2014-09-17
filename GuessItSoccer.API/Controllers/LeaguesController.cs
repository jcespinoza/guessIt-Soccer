using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AttributeRouting.Web.Http;
using AutoMapper;
using FluentNHibernate.Utils;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;
using GuessItSoccer.Domain.Services;

namespace GuessItSoccer.API.Controllers
{
    public class LeaguesController: BaseApiController
    {
        readonly IReadOnlyRepository _readOnlyRepository;
        readonly IMappingEngine _mappingEngine;

        public LeaguesController(IReadOnlyRepository readOnlyRepository, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpGet]
        [AcceptVerbs("GET","HEAD")]
        [GET("leagues/available")]
        public List<LeagueModel> GetAvailableLeagues()
        {
            var userTokenModel = GetUserTokenModel();
            if (userTokenModel == null)
                throw new HttpException((int)HttpStatusCode.Unauthorized, "User is not authorized");

            var account = _readOnlyRepository.GetAll<League>().ToList();
            var leaguesModel = _mappingEngine.Map<List<League>, List<LeagueModel>>(account.ToList());

            return leaguesModel;
        }

        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("leagues/suscribed")]
        public List<LeagueModel> GetSuscribedLeagues()
        {
            var userTokenModel = GetUserTokenModel();
            if (userTokenModel == null)
                throw new HttpException((int)HttpStatusCode.Unauthorized, "User is not authorized");

            var account =
                _readOnlyRepository.Query<AccountLeague>(x => x.User.Email == userTokenModel.email)
                    .Select(y => y.League);
            var leaguesModel = _mappingEngine.Map<List<League>, List<LeagueModel>>(account.ToList());
            return leaguesModel;
        }
    }
}
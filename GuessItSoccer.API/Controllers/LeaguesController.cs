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
        private readonly IWriteOnlyRepository _writeOnlyRepository;
        readonly IMappingEngine _mappingEngine;

        public LeaguesController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
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

        [HttpGet]
        [AcceptVerbs("POST", "HEAD")]
        [POST("leagues/deleteleague/{id}")]
        public LeagueModel ArchiveLeague(int Id)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(le => le.Id == Id);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "League not found");

            foundLeague.IsArchived = true;
            var updatedLeague = _writeOnlyRepository.Update(foundLeague);
            var updatedLeagueModel = _mappingEngine.Map<League, LeagueModel>(updatedLeague);
            return updatedLeagueModel;
        }

        [HttpGet]
        [AcceptVerbs("POST", "HEAD")]
        [POST("leagues/restoreleague/{id}")]
        public LeagueModel RestoreLeague(int Id)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(le => le.Id == Id);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "League not found");

            foundLeague.IsArchived = false;
            var updatedLeague = _writeOnlyRepository.Update(foundLeague);
            var updatedLeagueModel = _mappingEngine.Map<League, LeagueModel>(updatedLeague);
            return updatedLeagueModel;
        }

        [HttpGet]
        [AcceptVerbs("POST", "HEAD")]
        [POST("leagues/createleague")]
        public LeagueCreatedModel CreateNewLeague([FromBody] NewLeagueModel model)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault < League>(le => le.Name == model.Name);
            if(foundLeague != null)
                throw new HttpException((int)HttpStatusCode.Conflict, "A league with this name was already registered");

            League newLeague = _mappingEngine.Map<NewLeagueModel, League>(model);
            League createdLeague = _writeOnlyRepository.Create(newLeague);

            var leagueCreatedModel = _mappingEngine.Map<League, LeagueCreatedModel>(createdLeague);
            leagueCreatedModel.Value = "Successufully Created the league";
            return leagueCreatedModel;
        }

        [HttpGet]
        [AcceptVerbs("POST", "HEAD")]
        [POST("leagues/editleague/{id}")]
        public UpdatedLeagueModel UpdateLeague([FromBody] LeagueUpdateModel model)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault< League>(le => le.Id == model.Id);
            if(foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "That League was not found");

            foundLeague.Name = model.Name;
            foundLeague.Country = model.Country;
            League updatedLeague = _writeOnlyRepository.Update(foundLeague);

            UpdatedLeagueModel updatedModel = new UpdatedLeagueModel()
            {
                Value = "Succesfully Updated the League"
            };
            return updatedModel;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AttributeRouting.Web.Http;
using AutoMapper;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;
using GuessItSoccer.Domain.Services;

namespace GuessItSoccer.API.Controllers
{
    public class GamesController: BaseApiController
    {
        private readonly IReadOnlyRepository _readOnlyRepository;
        private readonly IWriteOnlyRepository _writeOnlyRepository;
        private readonly IMappingEngine _mappingEngine;

        public GamesController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("leagues/{leagueId}/games")]
        public List<Game> GetGames([FromUri] long leagueId)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == leagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            List<Game> gamesInLeague = foundLeague.Games.ToList();
            return gamesInLeague;
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("leagues/{leagueId}/games/creategame")]
        public void CreateGame([FromUri] long leagueId, [FromBody] NewGameModel model)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == leagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            Game foundGame = _readOnlyRepository.FirstOrDefault<Game>(
                x =>
                    x.HomeTeam.Id == model.HomeTeam.Id &&
                    x.AwayTeam.Id == model.AwayTeam.Id &&
                    x.MatchDate == model.MatchDate
                );

            if (foundGame != null)
                throw new HttpException((int)HttpStatusCode.NotFound, "A game with this data already exist");
            
            foundGame = _mappingEngine.Map<NewGameModel, Game>(model);
            var gameList = foundLeague.Games.ToList();
            gameList.Add(foundGame);
            foundLeague.Games = gameList;
            _writeOnlyRepository.Update(foundLeague);
        }
    }

    public class NewGameModel
    {
        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        public DateTime MatchDate { get; set; }
    }
}
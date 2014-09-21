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
    public class PredictionsController: BaseApiController
    {
        private readonly IReadOnlyRepository _readOnlyRepository;
        private readonly IWriteOnlyRepository _writeOnlyRepository;
        private readonly IMappingEngine _mappingEngine;

        public PredictionsController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository,
            IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("users/{userId}/predictions")]
        public List<PredictionGameModel> GetPredictions([FromUri] long userId)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(usr => usr.Id == userId);

            if(user == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "There's no user with that Id");

            var predictionData =
                _readOnlyRepository.Query<AccountGamePrediction>(pred => pred.User == user)
                    .Select(pred => new PredictionGameModel
                    {
                        HomeTeamName = pred.Game.HomeTeam.Name,
                        AwayTeamName = pred.Game.AwayTeam.Name,
                        MatchDate = pred.Game.MatchDate,
                        HomeTeamGoals = pred.Prediction.HomeTeamGoals,
                        AwayTeamGoals = pred.Prediction.AwayTeamGoals,
                        HomeTeamPenalties = pred.Prediction.HomeTeamPenalties,
                        AwayTeamPenalties = pred.Prediction.AwayTeamPenalties,
                        Winner = pred.Prediction.Winner
                    })
                    .ToList();
            //FIX THIS
            return new List<PredictionGameModel>();
            //FIX THIS
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("users/{userId}/games/{gameId}/predictions/createprediction/")]
        public bool CreatePrediction([FromUri] long userId, [FromUri] long gameId, [FromBody] PredictionFromUserModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(usr => usr.Id == userId);
            if (user == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "There's no user with that Id");

            var game = _readOnlyRepository.FirstOrDefault<Game>(ga => ga.Id == gameId);
            if (game == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "There's no game with that Id");

            var leagues = _readOnlyRepository.GetAll<League>().ToList().Where(le => le.Games.Contains(game));
            var league = leagues.FirstOrDefault(l => l.Games.ToList().Count > 0);
            //var leagues = _readOnlyRepository.FirstOrDefault<League>(le => le.Games.Where(ga => ga == game).Contains(game));
            if (league == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "There's no league which contains this game");

            var foundAccountGamePrediction = _readOnlyRepository.FirstOrDefault<AccountGamePrediction>(pred => pred.Game == game);
            if(foundAccountGamePrediction != null)
                throw new HttpException((int)HttpStatusCode.Conflict, "A prediction for this game already exist");

            var newAccountGamePrediction = new AccountGamePrediction
            {
                User = user,
                Prediction = _mappingEngine.Map<PredictionFromUserModel, Prediction>(model),
                Game = game,
                League = league
            };

            _writeOnlyRepository.Create(newAccountGamePrediction);

            return true;
        }
    }
}
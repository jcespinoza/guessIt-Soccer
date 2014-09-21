using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AttributeRouting.Web.Http;
using AutoMapper;
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

            //FIX THIS
            return new List<PredictionGameModel>();
            //FIX THIS
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("users/{userId}/predictions/createprediction")]
        public bool CreatePrediction([FromUri] long userId, [FromBody] long gameId, PredictionFromUserModel model)
        {
            return true;
        }
    }

    public class PredictionFromUserModel
    {
        public long GameId { get; set; }
        public int HomeTeamGoals { get; set; }
        public int AwayTeamGoals { get; set; }
        public int HomeTeamPenalties { get; set; }
        public int AwayTeamPenalties { get; set; }
        public WinnerTeam Winner { get; set; }
    }

    public class PredictionGameModel
    {
        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        public DateTime MatchDate { get; set; }
        public int HomeTeamGoals { get; set; }
        public int AwayTeamGoals { get; set; }
        public int HomeTeamPenalties { get; set; }
        public int AwayTeamPenalties { get; set; }
        public WinnerTeam Winner { get; set; }
    }
}
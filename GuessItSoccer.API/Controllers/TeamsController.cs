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
    public class TeamsController: BaseApiController
    {
        private readonly IReadOnlyRepository _readOnlyRepository;
        private readonly IWriteOnlyRepository _writeOnlyRepository;
        private readonly IMappingEngine _mappingEngine;


        public TeamsController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("leagues/{leagueId}/teams")]
        public List<Team> GetTeamsForLeagueWithId(long leagueId)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == leagueId);
            if(foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");

            List<Team> teamsInLeague = foundLeague.Teams.ToList();
            return teamsInLeague;
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("leagues/{leagueId}/teams/createteam")]
        public TeamCreatedModel AddTeamToLeague([FromBody] NewTeamModel model)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == model.LeagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            Team foundTeam = foundLeague.Teams.FirstOrDefault(x => x.Name == model.Name);
            if (foundTeam != null)
                throw new HttpException((int)HttpStatusCode.NotFound, "A team with this name already exist");

            foundTeam = _mappingEngine.Map<NewTeamModel, Team>(model);
            var teamList = foundLeague.Teams.ToList();
            teamList.Add(foundTeam);
            foundLeague.Teams = teamList;
            _writeOnlyRepository.Update(foundLeague);
            return new TeamCreatedModel(){Value = "Successfully created a new team"};
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("leagues/{leagueId}/teams/editteam")]
        public UpdatedTeamModel EditTeam([FromBody] TeamUpdateModel model)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == model.LeagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            Team foundTeam = foundLeague.Teams.FirstOrDefault(x => x.Id == model.TeamId);
            if (foundTeam == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "A team with this Id was not found");

            foundTeam.Name = model.Name;
            foundTeam.City = model.City;
            _writeOnlyRepository.Update(foundTeam);

            return new UpdatedTeamModel(){Value = "Successfully Edited Team"};
        }

        [HttpGet]
        [AcceptVerbs("DELETE", "HEAD")]
        [DELETE("leagues/{leagueId}/teams/deleteteam/{teamId}")]
        public DeletedTeamModel ArchiveTeam([FromUri] long leagueId, [FromUri] long teamId)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id ==leagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            Team foundTeam = foundLeague.Teams.FirstOrDefault(x => x.Id == teamId);
            if (foundTeam == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "A team with this Id was not found");
            foundTeam.IsArchived = true;
            _writeOnlyRepository.Update(foundTeam);

            return  new DeletedTeamModel(){Value = "Successfully archived the tem"};
        }

        [HttpGet]
        [AcceptVerbs("PUT", "HEAD")]
        [PUT("leagues/{leagueId}/teams/restoreteam/{teamId}")]
        public RestoredTeamModel RestoreTeam([FromUri] long leagueId, [FromUri] long teamId)
        {
            League foundLeague = _readOnlyRepository.FirstOrDefault<League>(x => x.Id == leagueId);
            if (foundLeague == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "The league can not be found. Please check the Id");
            Team foundTeam = foundLeague.Teams.FirstOrDefault(x => x.Id == teamId);
            if (foundTeam == null)
                throw new HttpException((int)HttpStatusCode.NotFound, "A team with this Id was not found");
            foundTeam.IsArchived = false;
            _writeOnlyRepository.Update(foundTeam);

            return new RestoredTeamModel(){ Value = "Successfully archived the tem" };
        }
    }
}
using System;
using System.Linq.Expressions;
using AutoMapper;
using GuessItSoccer.API.App_Start;
using GuessItSoccer.API.Controllers;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;
using NHibernate.Mapping;

namespace GuessItSoccer.API
{
    public class ConfigureAutomapper: IBootstrapperTask
    {
        public void Run()
        {
            //automappings go here
            //Ex: Mapper.CreateMap<SomeType, SomeOtherType>().ReverseMap();
            Mapper.CreateMap<AccountSignUpModel, Account>().ReverseMap();
            Mapper.CreateMap<Account, AccountRegisteredModel>().ReverseMap();
            Mapper.CreateMap<League, LeagueModel>().ReverseMap();
            Mapper.CreateMap<League, NewLeagueModel>().ReverseMap();
            Mapper.CreateMap<League, LeagueCreatedModel>().ReverseMap();
            Mapper.CreateMap<NewTeamModel, Team>().ReverseMap();
            Mapper.CreateMap<TeamUpdateModel, Team>().ForMember(x => x.Id, opt => opt.MapFrom(src => src.TeamId)).ReverseMap();
            Mapper.CreateMap<LeagueUpdateModel, League>().ReverseMap();
            Mapper.CreateMap<ResultDataModel, Prediction>().ReverseMap();
            Mapper.CreateMap<ResultDataModel, Result>().ReverseMap();
            Mapper.CreateMap<TeamModel, Team>().ReverseMap();
            Mapper.CreateMap<GameModel, Game>().ReverseMap();
            Mapper.CreateMap<LocationModel,Location>().ReverseMap();
            Mapper.CreateMap<Stadium, Stadium>().ReverseMap();
            Mapper.CreateMap<Account, UserModel>().ReverseMap();
        }
    }
}
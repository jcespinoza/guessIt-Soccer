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
            Mapper.CreateMap<NewGameModel, Game>().ReverseMap();
            /*
             * Mapper.CreateMap<LeagueUpdateModel, League>().ForMember(x => x.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.Country))
                .ForMember(x => x.Teams, opt => opt.DoNotUseDestinationValue())
                .ReverseMap();
             */
            //Mapper.CreateMap<LeagueUpdateModel, League>().ForMember(x => x.Teams, opt => opt.Ignore()).ReverseMap();

        }

        public static IMappingExpression<TSource, TDestination> Ignore<TSource, TDestination>(IMappingExpression<TSource, TDestination> map,
            Expression<Func<TDestination, object>> selector)
        {
            map.ForMember(selector, config => config.Ignore());
            return map;
        }
    }
}
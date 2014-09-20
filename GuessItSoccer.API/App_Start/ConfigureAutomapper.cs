using AutoMapper;
using GuessItSoccer.API.App_Start;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;

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
            Mapper.CreateMap<League, LeagueUpdateModel>().ReverseMap();
        }
    }
}
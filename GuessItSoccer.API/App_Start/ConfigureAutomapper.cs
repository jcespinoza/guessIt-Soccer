using AutoMapper;
using GuessItSoccer.API.App_Start;
using GuessItSoccer.API.Models;
using GuessItSoccer.Domain.Entities;

namespace GuessItSoccer.API
{
    public class ConfigureAutomapper: IBootstrapperTask
    {
        #region IBoostrapper Members
        public void Run()
        {
            //automappings go here
            //Ex: Mapper.CreateMap<SomeType, SomeOtherType>().ReverseMap();
            Mapper.CreateMap<AccountSignUpModel, Account>().ReverseMap();
            Mapper.CreateMap<AccountRegisteredModel, Account>().ReverseMap();
            Mapper.CreateMap<League, LeagueModel>().ReverseMap();
        }
        #endregion
    }
}
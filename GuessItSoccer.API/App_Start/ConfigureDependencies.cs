using System.Reflection;
using Autofac;
using AutoMapper;
using GuessItSoccer.Data;
using GuessItSoccer.Domain.Services;

namespace GuessItSoccer.API.App_Start
{
    public class ConfigureDependencies : IBootstrapperTask
    {
        readonly ContainerBuilder _containerBuilder;
        public ConfigureDependencies(ContainerBuilder containerBuilder)
        {
            _containerBuilder = containerBuilder;
        }

        public void Run()
        {
            Assembly data = Assembly.Load("GuessItSoccer.Data");
            Assembly domain = Assembly.Load("GuessItSoccer.Domain");

            _containerBuilder
                .RegisterAssemblyTypes(data, domain)
                .AsImplementedInterfaces();
            _containerBuilder.Register(c => Mapper.Engine).As<IMappingEngine>();
        }
    }
}
using System.Collections.Generic;
using NHibernate.Mapping;

namespace GuessItSoccer.Domain.Services
{
    public interface IEmailService
    {
        void SendEmail(List<string> toList, string from, string subject, string message);
    }
}
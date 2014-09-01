﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainDrivenDatabaseDeployer;
using GuessItSoccer.Domain.Entities;
using NHibernate;

namespace GuessItSoccer.DataBaseDeployer
{
    public class AccountSeeder: IDataSeeder
    {
        private readonly ISession _session;

        public AccountSeeder(ISession session)
        {
            _session = session;
        }

        public void Seed()
        {
            _session.Save(new Account
            {
                IsArchived = false,
                Email = "admin@jcespinoza.com",
                Name = "Juan Carlos",
                Password = ""
            });
        }
    }
}
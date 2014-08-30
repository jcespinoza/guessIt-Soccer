using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessItSoccer.Domain.Services
{
    public interface IEncryption
    {
        string Encrypt(string key, string content);
    }
}

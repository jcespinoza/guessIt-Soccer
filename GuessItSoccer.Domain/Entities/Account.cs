using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GuessItSoccer.Domain.Services;

namespace GuessItSoccer.Domain.Entities
{
    public class Account: IEntity
    {
        public virtual long Id { get; set; }

        public virtual bool IsArchived { get; set; }

        public virtual string Email { get; set; }

        public virtual string Name { get; set; }

        public virtual string Password { get; set; }


        public virtual IEnumerable<Prediction> Predictions { get; set; }
        public virtual IEnumerable<League>  Leagues { get; set; }

        public virtual bool PasswordsEqual(string testPassword)
        {
            IEncryption encryptor = new Sha256Encrypter();
            string hashedTestPassword = encryptor.Encrypt(testPassword);
            return (Password == hashedTestPassword);
        }
    }
}

using System.Web.Script.Serialization;
using GuessItSoccer.API.App_Start;
using GuessItSoccer.API.Models;

namespace GuessItSoccer.API
{
    public class AuthRequestFactory
    {
        public static string BuildEncryptedRequest(string email)
        {
            var request = new UserTokenModel
            {
                email = email
            };

            string jsonRequest = new JavaScriptSerializer().Serialize(request);
            string encryptedRequest = Encripter.Encrypt(jsonRequest);
            return encryptedRequest;
        }

        public static UserTokenModel BuildDecryptedRequest(string encryptedToken)
        {
            var jsonString = Encripter.Decrypt(encryptedToken);
            var decryptedAuthRequest = new JavaScriptSerializer().Deserialize<UserTokenModel>(jsonString);
            return decryptedAuthRequest;
        }
    }
}
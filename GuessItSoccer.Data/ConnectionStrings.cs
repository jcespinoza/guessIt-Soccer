using System.Configuration;
namespace GuessItSoccer.Data
{
    public class ConnectionStrings
    {
        public static string Get()
        {
            var local = ConfigurationManager.ConnectionStrings["local"].ToString();

            //Other two connections here

            var environment = (ConfigurationManager.AppSettings["Environment"] ?? "").ToLower();
            var connectionStringToUse = local;

            if (environment == "qa" || environment == "remote")
            {
                connectionStringToUse = string.Empty;
            }
            else if (environment == "production")
            {
                connectionStringToUse = string.Empty;
            }

            return connectionStringToUse;
        }
    }
}

using System.Collections.Generic;
using System.Net;
using System.Web;
using GuessItSoccer.API.Models;

namespace GuessItSoccer.API.Controllers
{
    public class LeaguesController: BaseApiController
    {
        public List<LeaguesModel> GetLeagues()
        {
            var userTokenModel = GetUserTokenModel();
            if (userTokenModel == null)
                throw new HttpException((int)HttpStatusCode.Unauthorized, "User is not authorized");

            return new List<LeaguesModel>();
        }
    }
}
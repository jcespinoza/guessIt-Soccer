namespace GuessItSoccer.API.Models
{
    public class AuthModel
    {
        public string Token { get; set; }
        public string email { get; set; }
        public string access_token { get; set; }
        public RoleModel role { get; set; }
    }
}
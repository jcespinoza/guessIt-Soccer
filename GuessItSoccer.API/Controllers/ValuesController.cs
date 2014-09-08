using System.Collections.Generic;
using System.Web.Http;
using AttributeRouting.Web.Http;

namespace GuessItSoccer.API.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("values")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet]
        [AcceptVerbs("GET", "HEAD")]
        [GET("values/{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("values")]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut]
        [AcceptVerbs("PUT", "HEAD")]
        [POST("values/{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete]
        [AcceptVerbs("DELETE", "HEAD")]
        [POST("values/{id}")]
        public void Delete(int id)
        {
        }
    }
}
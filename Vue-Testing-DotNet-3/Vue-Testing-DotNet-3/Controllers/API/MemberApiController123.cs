using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Vue_Testing_DotNet_3.Controllers.API
{
    [RoutePrefix("api/member")]
    public class MemberApiController123 : ApiController
    {
        [Route("{userName}")]
        public object Get(string userName)
        {
            return new
            {
                UserName = userName,
                LoginId = userName,
                Age = 18,
                Ip = "192.168.1.1"
            };
        }

        [Route("login")]
        public string Login(LoginRequest request)
        {
            // login checking flow...
            if (request.LoginId == "exception")
            {
                throw new Exception("Exception test show alert...");
            }

            if (request.Password != "abc123") {
                return "fail";
            }

            return "success";
            
        }

        public class LoginRequest
        {
            public string LoginId { get; set; }

            public string Password { get; set; }
        }
    }
}
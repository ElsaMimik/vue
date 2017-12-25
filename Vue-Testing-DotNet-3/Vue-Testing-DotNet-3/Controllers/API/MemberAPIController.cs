using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Vue_Testing_DotNet_3.Controllers.API
{
    [RoutePrefix("api/member")]
    public class MemberAPIController : ApiController
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
    }
}
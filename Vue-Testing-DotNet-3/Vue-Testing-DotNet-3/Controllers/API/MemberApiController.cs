using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Vue_Testing_DotNet_3.Controllers.API
{
    [RoutePrefix("api/member")]
    public class MemberApiController : ApiController
    {
        [Route("{userName}/profile")]
        public async Task<object> Get(string userName, CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

            return new
            {
                UserName = userName,
                LoginId = userName,
                Age = 18,
                Ip = "192.168.1.1"
            };
        }

        [HttpPost]
        [Route("login")]
        public async Task<string> Login(LoginRequest request, CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

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

        [HttpGet]
        [Route("listing")]
        public async Task<object> Listing(CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

            return new MemberModel[]
            {
                new MemberModel
                {
                    UserName = "AlphaNO1",
                    MemberId = 1,
                    Email = "test@123.com",
                    LastLogin = DateTimeOffset.Now,
                    RegistDate = DateTimeOffset.Now
                },
                new MemberModel
                {
                    UserName = "AlphaNO2",
                    MemberId = 2,
                    Email = "test@123.com",
                    LastLogin = DateTimeOffset.Now,
                    RegistDate = DateTimeOffset.Now
                },
                new MemberModel
                {
                    UserName = "AlphaNO3",
                    MemberId = 3,
                    Email = "test@123.com",
                    LastLogin = DateTimeOffset.Now,
                    RegistDate = DateTimeOffset.Now
                },
                new MemberModel
                {
                    UserName = "AlphaNO4",
                    MemberId = 4,
                    Email = "test@123.com",
                    LastLogin = DateTimeOffset.Now,
                    RegistDate = DateTimeOffset.Now
                }
            };
        }

        public class MemberModel
        {
            public string UserName { get; set; }

            public int MemberId { get; set; }

            public string Email { get; set; }

            public DateTimeOffset LastLogin { get; set; }

            public DateTimeOffset RegistDate { get; set; }
        }

        public class LoginRequest
        {
            public string LoginId { get; set; }

            public string Password { get; set; }
        }
    }
}
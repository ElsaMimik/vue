using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Vue_Testing_DotNet_3.Hubs;
using Vue_Testing_DotNet_3.Models;

namespace Vue_Testing_DotNet_3.Controllers.API
{
    [RoutePrefix("api/member")]
    public class MemberApiController : ApiController
    {
        private static List<MemberModel> _Members = new List<MemberModel>
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

        [HttpGet]
        [Route("{userName}/profile")]
        public async Task<object> GetAsync(string userName, CancellationToken cancellationToken)
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
        public async Task<string> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

            // login checking flow...
            if (request.LoginId == "exception")
            {
                throw new Exception("Exception test show alert...");
            }

            if (request.Password != "abc123")
            {
                return "fail";
            }

            return "success";

        }

        [HttpGet]
        [Route("listing")]
        public async Task<object> ListingAsync(CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

            return _Members;
        }

        [HttpPut]
        [Route("")]
        public async Task CreateMemberAsync(NewMemberRequest request, CancellationToken cancellationToken)
        {
            //test async method
            await Task.Delay(10, cancellationToken);

            if (request.NeedException > 0)
            {
                throw new Exception("Exception new member test show alert...");
            }

            MemberModel member = null;
            lock (_Members)
            {
                var memberId = _Members.Count() + 1;
                member = new MemberModel
                {
                    UserName = request.UserName,
                    Email = request.Email,
                    MemberId = memberId,
                    RegistDate = DateTimeOffset.Now,
                    LastLogin = null
                };
                _Members.Add(member);
            }

            MemberHub.NewMemberNotify(member);
        }

        public class NewMemberRequest
        {
            public string UserName { get; set; }

            public string Email { get; set; }

            public int NeedException { get; set; }
        }

        public class LoginRequest
        {
            public string LoginId { get; set; }

            public string Password { get; set; }
        }
    }
}
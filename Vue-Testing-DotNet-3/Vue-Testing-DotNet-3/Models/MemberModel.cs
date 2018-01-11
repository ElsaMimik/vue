using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vue_Testing_DotNet_3.Models
{
    public class MemberModel
    {
        public string UserName { get; set; }

        public int MemberId { get; set; }

        public string Email { get; set; }

        public DateTimeOffset? LastLogin { get; set; }

        public DateTimeOffset RegistDate { get; set; }
    }
}
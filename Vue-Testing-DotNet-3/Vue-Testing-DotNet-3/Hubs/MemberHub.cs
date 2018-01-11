using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Vue_Testing_DotNet_3.Models;
using System.Threading.Tasks;

namespace Vue_Testing_DotNet_3.Hubs
{
    public class MemberHub : Hub
    {
        public static void NewMemberNotify(MemberModel member)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<MemberHub>();
            hub.Clients.Group("member-room").newNotify(member);
        }

        public Task JoinGroup(string groupName)
        {
            return Groups.Add(Context.ConnectionId, groupName);
        }

        public Task LeaveGroup(string groupName)
        {
            return Groups.Remove(Context.ConnectionId, groupName);
        }
    }
}
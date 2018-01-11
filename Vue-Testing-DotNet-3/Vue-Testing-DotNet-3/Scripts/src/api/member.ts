import Moment from 'moment'

import * as Model from './member-m'
import handler from './base-handler'

class MemberController {

    async get(userName: string): Promise<Model.MemberProfile> {
        let config = {
            url: '/member/' + userName + '/profile',
            method: 'get'
        };
        let response = await handler.request(config);
        let member = new Model.MemberProfile();
        member.userName = response.data.UserName;
        member.loginId = response.data.LoginId;
        member.age = response.data.Age;
        member.ip = response.data.Ip;
        return member;
    }

    async login(request: Model.LoginRequest): Promise<boolean> {
        let config = {
            url: '/member/login',
            method: 'post',
            data: {
                LoginId: request.loginId,
                Password: request.password
            }
        };
        var response = await handler.request(config);
        return response.data && response.data === 'success';
    }

    async listing(): Promise<Model.MemberInfo[]> {
        let config = {
            url: '/member/listing',
            method: 'get'
        };
        var response = await handler.request(config);
        if (response.data) {
            let data = response.data;
            let results: Model.MemberInfo[] = [];
            for (let element of data) {
                let info = new Model.MemberInfo();
                info.userName = element.UserName;
                info.memberId = element.MemberId;
                info.email = element.Email;
                info.lastLogin = Moment(element.LastLogin);
                info.registDate = Moment(element.RegistDate);
                results.push(element);
            }
            return results;
        }
        return [];
    }

    async put(request: Model.NewMemberRequest): Promise<void> {
        let config = {
            url: '/member',
            method: 'put',
            data: {
                UserName: request.userName,
                Email: request.email,
                NeedException: request.isException
            }
        };
        await handler.request(config);
    }
}

const model = new MemberController();

export default model;

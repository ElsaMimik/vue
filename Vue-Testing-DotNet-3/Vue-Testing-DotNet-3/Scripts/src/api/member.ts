import * as Model from './member-m'
import handler from './base-handler'

class MemberController {

    async get(userName: string): Promise<Model.Member> {
        let config = {
            url: '/member/' + userName,
            method: 'get'
        };
        let response = await handler.request(config);
        let member = new Model.Member();
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
}

const model = new MemberController();

export default model;

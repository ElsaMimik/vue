import * as Model from './member-m'
import handler from './base-handler'

class MemberController {

    get(userName: string, successCallback?: HttpCallback.Success, errorCallback?: HttpCallback.Error) {
        let config = {
            url: '/member/' + userName,
            method: 'get'
        };
        return handler.request(config, successCallback, errorCallback);
    }

    login(request: Model.LoginRequest, successCallback?: HttpCallback.Success, errorCallback?: HttpCallback.Error) {
        let config = {
            url: '/member/login',
            method: 'post',
            data: {
                LoginId: request.loginId,
                Password: request.password
            }
        };
        return handler.request(config, successCallback, errorCallback);
    }
}

export default new MemberController();

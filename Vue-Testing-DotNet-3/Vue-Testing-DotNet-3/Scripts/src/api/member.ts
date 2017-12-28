import handler from './base-handler'
import * as Model from './member-m'

export default {
    get(userName: string, successCallback?: CallbackFunction.Success, errorCallback?: CallbackFunction.Success) {
        let config = {
            url: '/member/' + userName,
            method: 'get'
        };
        return handler.request(config, successCallback, errorCallback);
    },
    login(request: Model.LoginRequest, successCallback?: CallbackFunction.Success, errorCallback?: CallbackFunction.Success) {
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
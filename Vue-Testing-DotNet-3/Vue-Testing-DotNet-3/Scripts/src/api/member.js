import handler from './base-handler';
export default {
    get: function (userName, successCallback, errorCallback) {
        var config = {
            url: '/member/' + userName,
            method: 'get'
        };
        return handler.request(config, successCallback, errorCallback);
    },
    login: function (request, successCallback, errorCallback) {
        var config = {
            url: '/member/login',
            method: 'post',
            data: {
                LoginId: request.loginId,
                Password: request.password
            }
        };
        return handler.request(config, successCallback, errorCallback);
    }
};
//# sourceMappingURL=member.js.map
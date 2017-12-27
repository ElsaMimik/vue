//AxiosResponse is optional
import axios from 'axios';
axios.defaults.baseURL = '/api/';
function requestHandle(config, successCallback, errorCallback) {
    var instance = axios.create();
    return instance.request(config).then(function (response) {
        if (successCallback) {
            successCallback(response.data, response);
        }
    }, function (response) {
        if (errorCallback) {
            errorCallback(response);
        }
    });
}
export default {
    get: function (userName, successCallback, errorCallback) {
        var config = {
            url: '/member/' + userName,
            method: 'get'
        };
        return requestHandle(config, successCallback, errorCallback);
    },
    login: function (request, successCallback, errorCallback) {
        var data = {
            LoginId: request.loginId,
            Password: request.password
        };
        var config = {
            url: '/member/login',
            method: 'post'
        };
        return requestHandle(config, successCallback, errorCallback);
    }
};
//# sourceMappingURL=member.js.map